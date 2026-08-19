/**
 * verify-articles.ts
 *
 * src/data/articles/*.ts 에 작성된 모든 ArticleData를 정량 검증.
 * npm run build 전에 자동 실행되어 미달 글 발견 시 빌드 차단.
 *
 * 검증 항목:
 *  1. primaryKeywords가 meta.title에 ≥2개 포함되는가
 *  2. primaryKeywords가 meta.description에 ≥1개 포함되는가
 *  3. 모든 mainSections[i].heading에 primaryKeywords ≥1개 포함되는가
 *  4. searchIntent.directAnswer가 50자 이내 단문인가
 *  5. searchIntent.why에 법령 조문(제\d+조) 인용이 있는가
 *  6. sources의 모든 URL이 .go.kr / .or.kr 등 공식 출처인가
 *  7. lastVerified가 30일 초과면 WARN, 90일 초과면 ERROR
 *  8. legalBasis[i].verifiedAt이 lastVerified보다 오래되면 WARN
 *  9. numericClaims의 sourceIndex가 sources 범위 안인가
 *
 * 사용법: npx tsx scripts/verify-articles.ts
 * CI 통과 조건: ERROR 0개
 */

import * as path from "path";
import * as fs from "fs";
import { pathToFileURL } from "url";
// 정본 템플릿에서 직접 추출한 기준. 기준값을 코드에 박지 않기 위함.
import { profile as TPL } from "./template-profile.mjs";

type Severity = "ERROR" | "WARN";

interface VerifyIssue {
  slug: string;
  rule: string;
  severity: Severity;
  message: string;
}

const ROOT = path.resolve(__dirname, "..");
const ARTICLES_DIR = path.join(ROOT, "src", "data", "articles");

const OFFICIAL_DOMAINS = [
  ".go.kr",
  ".or.kr",
  ".seoul.go.kr",
  ".moel.go.kr",
  ".nps.or.kr",
  ".law.go.kr",
  ".easylaw.go.kr",
  ".nts.go.kr",
  ".hometax.go.kr",
  ".molit.go.kr",
  ".reb.or.kr",
  ".khug.or.kr",
  ".bokjiro.go.kr",
  ".gov.kr",
  ".fss.or.kr",
  ".fsc.go.kr",
  ".ei.go.kr",
  ".work24.go.kr",
  ".kcomwel.or.kr",
];

function isOfficial(url: string): boolean {
  try {
    const u = new URL(url);
    return OFFICIAL_DOMAINS.some((d) => u.hostname.endsWith(d));
  } catch {
    return false;
  }
}

function daysSince(yyyymmdd: string): number {
  const t = new Date(yyyymmdd).getTime();
  if (isNaN(t)) return Infinity;
  return (Date.now() - t) / 86_400_000;
}

function countContains(haystack: string, needles: readonly string[]): number {
  return needles.reduce((n, kw) => n + (haystack.includes(kw) ? 1 : 0), 0);
}

async function loadAllArticles(): Promise<any[]> {
  const files = fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "types.ts");

  const out: any[] = [];
  for (const file of files) {
    const full = path.join(ARTICLES_DIR, file);
    // dynamic import via tsx
    const mod = await import(pathToFileURL(full).href);
    const exportName = Object.keys(mod).find((k) => k !== "default");
    if (!exportName) continue;
    const cat = mod[exportName];
    if (!cat?.articles) continue;
    for (const article of cat.articles) {
      out.push(article);
    }
  }
  return out;
}

function verifyArticle(article: any): VerifyIssue[] {
  const issues: VerifyIssue[] = [];
  const slug = article.slug ?? "<no-slug>";
  const push = (rule: string, severity: Severity, message: string) =>
    issues.push({ slug, rule, severity, message });

  // 1. primaryKeywords 존재
  const kws: string[] = article.primaryKeywords ?? [];
  if (!Array.isArray(kws) || kws.length < 2) {
    push("primaryKeywords", "ERROR", "primaryKeywords가 2개 미만");
    return issues;
  }

  // 2. title에 ≥2개 포함
  const title: string = article.meta?.title ?? "";
  if (countContains(title, kws) < 2) {
    push(
      "title-keywords",
      "ERROR",
      `meta.title에 primaryKeywords가 2개 미만 포함됨. title="${title}", keywords=${JSON.stringify(kws)}`
    );
  }

  // 2-2. 타이틀 공식 — 메인키워드 + 세부(행동)키워드 나열 + 후킹
  //
  // 정본 템플릿의 타이틀이 기준이다.
  //   "어린이집 방과후 보육료 지원 대상·지원금액·신청방법 총정리 (2026)"
  //    └ 메인키워드 ──────────┘ └ 세부·행동 나열(중점) ─┘ └ 후킹 ┘
  //
  // 이 검사가 없던 동안 21편이 전부 "ISA 계좌 단점 — 출금이 막히는데 어디까지 맞나요"
  // 같은 형태로 나갔다. 대시로 자르고, 요로 끝내고, 나열이 없다. 감으로 쓴 결과다.
  {
    // 요 어미 — 타이틀은 검색어에 얹는 자리라 말끝을 늘이지 않는다
    const politeEnding = title.match(/(나요|까요|세요|어요|에요|예요|해요|았나|었나)/);
    if (politeEnding) {
      push(
        "title-form",
        "ERROR",
        `타이틀에 "${politeEnding[1]}" 어미가 있음 — 타이틀에서 요 어미는 뺀다: "${title}"`
      );
    }

    // 대시로 자르지 않는다. 정본은 중점(·)으로 나열하고 쉼표로 끊는다.
    if (/[—–]/.test(title)) {
      push("title-form", "ERROR", `타이틀에 대시(—)를 씀 — 중점(·)과 쉼표로 나열한다: "${title}"`);
    }

    // 세부 키워드 나열 — 중점이 최소 1개 있어야 "나열"이다
    if (!title.includes("·")) {
      push(
        "title-form",
        "ERROR",
        `타이틀에 세부 키워드 나열(중점 ·)이 없음 — "대상·지원금액·신청방법" 처럼 묶는다: "${title}"`
      );
    }

    // 행동 키워드 — 검색자가 하려는 일이 타이틀에 있어야 한다
    const ACTION =
      /(신청|접수|조회|발급|개설|가입|해지|인출|출금|연장|전환|청구|계산|비교|확인|납입|수령|신고|받는\s*법|하는\s*법|방법|기준|조건|서류)/;
    if (!ACTION.test(title)) {
      push(
        "title-form",
        "ERROR",
        `타이틀에 행동 키워드가 없음 (신청·조회·개설·계산·비교 등): "${title}"`
      );
    }
  }

  // 3. description에 ≥1개 포함
  const desc: string = article.meta?.description ?? "";
  if (countContains(desc, kws) < 1) {
    push(
      "description-keywords",
      "ERROR",
      `meta.description에 primaryKeywords가 하나도 없음`
    );
  }

  // 4. 모든 mainSections.heading에 ≥1개 포함
  for (let i = 0; i < (article.mainSections?.length ?? 0); i++) {
    const h = article.mainSections[i].heading ?? "";
    if (countContains(h, kws) < 1) {
      push(
        "heading-keywords",
        "ERROR",
        `mainSections[${i}].heading에 primaryKeywords 없음: "${h}"`
      );
    }
  }

  // 5. directAnswer 50자 이내
  const da: string = article.searchIntent?.directAnswer ?? "";
  if (da.length > 50) {
    push(
      "directAnswer-length",
      "WARN",
      `directAnswer가 ${da.length}자 (50자 권장 초과)`
    );
  }

  // 6. why에 법령 조문 인용
  // 근거 출처 명시 — 법령 조문이 정석이지만, 제도 개편처럼 행정 발표가 1차 근거인
  // 주제도 있다. 조문 / 보도자료·고시·공고 중 하나를 가리키면 통과시킨다.
  const why: string = article.searchIntent?.why ?? "";
  const hasCitation =
    /제\s*\d+\s*조/.test(why) ||
    /(보도자료|고시|공고|지침|사업안내|행정예고)/.test(why);
  if (!hasCitation) {
    push(
      "why-citation",
      "WARN",
      "searchIntent.why에 근거 출처가 없음 — 법령 조문 또는 보도자료·고시를 명시하세요"
    );
  }

  // 7. sources URL 공식 출처
  const sources: any[] = article.sources ?? [];
  if (sources.length === 0) {
    push("sources-empty", "ERROR", "sources가 비어있음");
  } else {
    const nonOfficial = sources.filter((s) => !isOfficial(s.url));
    if (nonOfficial.length > 0) {
      push(
        "sources-official",
        "ERROR",
        `비공식 URL 발견: ${nonOfficial.map((s) => s.url).join(", ")}`
      );
    }
  }

  // 8. lastVerified 만료
  const lv: string = article.lastVerified ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lv)) {
    push("lastVerified-format", "ERROR", `lastVerified 형식 오류: "${lv}"`);
  } else {
    const d = daysSince(lv);
    if (d > 90) {
      push("lastVerified-stale", "ERROR", `lastVerified ${Math.floor(d)}일 경과 (90일 초과)`);
    } else if (d > 30) {
      push("lastVerified-stale", "WARN", `lastVerified ${Math.floor(d)}일 경과 (30일 초과)`);
    }
  }

  // 9. legalBasis.verifiedAt
  const lb: any[] = article.context?.legalBasis ?? [];
  for (let i = 0; i < lb.length; i++) {
    const v = lb[i].verifiedAt;
    if (v && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
      const d = daysSince(v);
      if (d > 90) {
        push(
          "legalBasis-verifiedAt",
          "WARN",
          `legalBasis[${i}] (${lb[i].law})의 verifiedAt이 ${Math.floor(d)}일 경과`
        );
      }
    }
  }

  // 10. numericClaims sourceIndex 범위
  const nc: any[] = article.numericClaims ?? [];
  for (let i = 0; i < nc.length; i++) {
    const idx = nc[i].sourceIndex;
    if (idx < 0 || idx >= sources.length) {
      push(
        "numericClaim-index",
        "ERROR",
        `numericClaims[${i}] (${nc[i].value})의 sourceIndex ${idx}가 sources 범위 밖`
      );
    }
  }

  // ── 11~17. 정본 템플릿(docs/moneywiki-article-template.html) 블록 준수 ──

  // 11. heroHook — 서론. 마지막 문장이 행동 유도여야 한다.
  const hook: string = article.heroHook ?? "";
  if (!hook) {
    push("template-heroHook", "ERROR", "heroHook(서론)이 없음 — 템플릿 .lead 다음 문단이 비었다");
  } else if (hook.length < 80) {
    push("template-heroHook", "WARN", `heroHook이 ${hook.length}자로 짧음 (결론 + 행동 유도 2문장 이상 권장)`);
  }

  // 12. heroCta — 서론 직하 대형 CTA 1개, 공식 사이트의 실제 행동 페이지로
  const cta = article.heroCta;
  if (!cta?.url) {
    push("template-heroCta", "ERROR", "heroCta(서론 아래 행동유도 버튼)가 없음");
  } else if (!isOfficial(cta.url)) {
    push("template-heroCta", "ERROR", `heroCta.url이 공식 사이트가 아님: ${cta.url}`);
  }

  // 12-2. 딥링크 — 기관 홈페이지로 보내면 사용자가 다시 길을 찾아야 한다.
  //       "조회하기"를 눌렀는데 홈이 뜨면 행동이 끊긴다. 실제 그 일을 하는 페이지로 보낸다.
  const isHomepage = (u: string) => {
    try {
      const { pathname, search } = new URL(u);
      return (pathname === "/" || pathname === "") && !search;
    } catch {
      return false;
    }
  };
  const actionUrls: { label: string; url: string; labelText: string }[] = [
    ...(cta?.url ? [{ label: "heroCta", url: cta.url, labelText: cta.label ?? "" }] : []),
    ...(article.resolution?.steps ?? [])
      .filter((s: any) => s.action?.url)
      .map((s: any, i: number) => ({
        label: `steps[${i}] 버튼`,
        url: s.action.url,
        labelText: s.action.label ?? "",
      })),
    ...(article.mainSections ?? [])
      .map((s: any, i: number) =>
        s.cta?.url ? { label: `q${i + 1} 버튼`, url: s.cta.url, labelText: s.cta.label ?? "" } : null
      )
      .filter(Boolean),
  ];

  // 12-3. 행동 섹션에는 버튼이 있어야 한다.
  //       q1 소제목이 "신청 방법"인데 정작 누를 곳이 없으면 행동이 끊긴다.
  const firstSection = (article.mainSections ?? [])[0];
  if (
    firstSection &&
    /(신청|접수|조회|받는\s*방법|하는\s*방법|절차|다운로드)/.test(firstSection.heading ?? "") &&
    !firstSection.cta?.url
  ) {
    push(
      "action-section-button",
      "ERROR",
      `q1 "${firstSection.heading}"은 행동 섹션인데 버튼(cta)이 없음 — 읽고 바로 누를 곳을 두세요`
    );
  }

  for (const a of actionUrls) {
    if (isHomepage(a.url)) {
      push(
        "cta-deeplink",
        "ERROR",
        `${a.label}이 기관 홈페이지로 연결됨 (${a.url}) — 실제 신청·조회 페이지 주소를 넣으세요`
      );
    }
  }

  // 12-3-2. 버튼 문구는 행동이어야 한다.
  //   "제도 요약표 펼쳐 보기", "가입자격 요약표 확인하기" 같은 열람형 문구가 실제로 나갔다.
  //   버튼을 누르는 사람은 자료를 열람하러 가는 게 아니라 무언가를 하러 간다.
  //   "가입 자격 확인하기", "소득확인증명서 발급하기" 처럼 할 일을 그대로 쓴다.
  {
    const BROWSE = /(펼쳐|열어\s*보기|열기$|보기$|요약표|안내표|공시 화면|화면으로 이동|다시 보기|함께 보기)/;
    const ACT_LABEL = /(하기|받기|신청|발급|조회|확인|비교|계산|개설|가입|이체|인출|해지|수령)/;
    for (const a of actionUrls) {
      const label = (a as any).labelText ?? "";
      if (!label) continue;
      if (BROWSE.test(label)) {
        push("cta-label-browse", "ERROR", `${a.label} 문구가 열람형입니다: "${label}" — 할 일을 그대로 씁니다`);
      } else if (!ACT_LABEL.test(label)) {
        push("cta-label-browse", "ERROR", `${a.label} 문구에 행동이 없습니다: "${label}"`);
      }
    }
  }

  // 12-4. CTA 단조로움 — 버튼이 3개 이상인데 전부 같은 주소면 유도가 아니라 도배다.
  //       실제로 보험 11편의 버튼 44개가 전부 한 링크였다 (2026-08-16 발견).
  //       섹션마다 하는 일(조회·신청·청구)이 다르면 버튼도 달라야 한다.
  if (actionUrls.length >= 3) {
    const unique = new Set(actionUrls.map((a) => a.url));
    if (unique.size === 1) {
      push(
        "cta-monotony",
        "ERROR",
        `행동 버튼 ${actionUrls.length}개가 전부 같은 주소(${actionUrls[0].url}) — ` +
          `섹션 성격에 맞는 딥링크로 나누세요. 각 링크는 열어서 확인한 뒤 넣습니다`
      );
    }
  }

  // 12-5. 검색어 조사 — 감으로 제목을 짓지 않는다.
  //       collect-keywords.mjs가 네이버에서 뽑은 scripts/keywords/<slug>.json이 있어야 하고,
  //       타이틀은 수집된 검색어 중 최소 1개와 겹쳐야 한다 (공백 제거 후 부분일치).
  {
    const kwFile = path.join(ROOT, "scripts", "keywords", `${article.slug}.json`);
    if (!fs.existsSync(kwFile)) {
      push(
        "keyword-research",
        "ERROR",
        `검색어 조사 파일 없음 — node scripts/collect-keywords.mjs ${article.slug} --q "..." 를 먼저 돌리세요`
      );
    } else {
      try {
        const kw = JSON.parse(fs.readFileSync(kwFile, "utf8"));
        const collected: string[] = (kw.queries ?? []).flatMap((q: any) => [
          ...(q.autocomplete ?? []),
          ...(q.related ?? []),
        ]);
        // 대소문자는 무시한다. 네이버 자동완성은 같은 검색어를 "ISA"로도 "isa"로도
        // 돌려주는데, 그 차이 때문에 실제로 반영한 검색어를 안 겹친다고 잡았다.
        const flat = (s: string) => s.replace(/\s+/g, "").toLowerCase();
        const title = flat(article.meta?.title ?? "");
        const hit = collected.filter((c) => c && title.includes(flat(c)));
        if (collected.length > 0 && hit.length === 0) {
          push(
            "keyword-research",
            "ERROR",
            `타이틀이 수집된 검색어 ${collected.length}개 중 어느 것과도 겹치지 않음 — ` +
              `실제 검색어(예: ${collected.slice(0, 3).join(", ")})를 타이틀에 반영하세요`
          );
        }
      } catch {
        push("keyword-research", "ERROR", `검색어 파일이 깨져 있음: ${kwFile}`);
      }
    }
  }

  // 12-6. 훅이 버튼을 부르는가.
  //   정본은 heroHook 마지막 문장이 바로 아래 버튼을 누를 이유가 된다.
  //   실제로는 "증권사 고를 때 수수료만 따지면 된다"로 끝나 놓고 버튼이
  //   소득확인증명서 발급인 글이 나갔다. 누를 이유가 없다.
  if (cta?.label && article.heroHook) {
    const core = String(cta.label)
      .replace(/(하기|받기|보기|열기|이동|진행|신청하기)$/g, "")
      .split(/[·,\s]+/)
      .map((t) => t.replace(/(을|를|은|는|이|가|에서|으로|로)$/, ""))
      .filter((t) => t.length >= 2);
    const hook = String(article.heroHook);
    if (core.length && !core.some((t) => hook.includes(t))) {
      push(
        "hero-hook-cta",
        "ERROR",
        `heroHook이 버튼("${cta.label}")을 부르지 않습니다 — 마지막 문장이 그 버튼을 누를 이유가 되어야 합니다`
      );
    }
  }

  // 13. keyFacts — 📌 핵심콕콕 7~9행
  const kf: any[] = article.keyFacts ?? [];
  if (kf.length === 0) {
    push("template-keyFacts", "ERROR", "keyFacts(핵심콕콕)가 없음");
  }
  // 행수 검사는 15-6에서 템플릿 프로필 기준으로 수행한다 (여기서 중복 검사하지 않음)

  // 14. mainSections 개수 + q1은 행동(신청) 섹션
  const secs: any[] = article.mainSections ?? [];
  // 소제목 개수는 타이틀이 정한다 (15-6에서 대조). 여기서는 최소선만 지킨다.
  if (secs.length < 4) {
    push("template-sections", "ERROR", `mainSections가 ${secs.length}개 — 내용이 너무 얇습니다 (최소 4개)`);
  }
  const q1 = secs[0]?.heading ?? "";
  if (q1 && !/(신청|접수|조회|받는\s*방법|하는\s*방법|절차)/.test(q1)) {
    push(
      "template-q1-action",
      "WARN",
      `q1이 행동 섹션이 아님 — hero 버튼이 받을 신청·절차 섹션이어야 한다: "${q1}"`
    );
  }

  // 14-2. 소제목에 얹은 검색어를 본문도 쓰는가.
  //
  //   소제목만 검색어에 맞춰 갈아 끼우고 본문은 그대로 둔 글이 실제로 나갔다.
  //   "자녀도 되나요"인데 본문에 자녀가 한 번도 안 나오고, "순위"를 달아 놓고
  //   본문은 순위 이야기를 안 하는 식이다. 들어와서 읽는 사람은 답을 못 찾는다.
  //
  //   판정은 수집된 검색어에 있는 낱말로만 한다. 어휘를 통째로 맞추라고 하면
  //   "제한", "종류" 같은 말까지 본문에 억지로 심게 된다 — 그건 글을 망친다.
  {
    const kwFile = path.join(ROOT, "scripts", "keywords", `${article.slug}.json`);
    let searchWords: string[] = [];
    try {
      const kw = JSON.parse(fs.readFileSync(kwFile, "utf8"));
      const collected: string[] = (kw.queries ?? []).flatMap((q: any) => [
        ...(q.autocomplete ?? []),
        ...(q.related ?? []),
      ]);
      searchWords = [
        ...new Set(
          collected
            .flatMap((c: string) => c.split(/\s+/))
            .map((w) => w.replace(/[()]/g, "").toLowerCase())
            .filter((w) => w.length >= 2)
        ),
      ];
    } catch {
      /* 검색어 파일 없음은 12-5에서 이미 ERROR */
    }

    for (let i = 0; i < secs.length; i++) {
      const h: string = secs[i].heading ?? "";
      const body: string = (secs[i].body ?? "").toLowerCase();
      // 주제어(ISA·IRP·계좌…)는 뺀다. 모든 문단에 상표를 심으라는 뜻이 아니다.
      const TOPIC = new Set(["isa", "irp", "계좌", "연금", "보험", "퇴직금"]);
      // 조사·어미가 붙은 토막과 뼈대 없는 말은 뺀다. 남는 것은 내용을 가리키는 낱말뿐이다.
      const FUNC = /(요|게|나|지|고|며|서|든|을|를|에|와|과|도|만|이|가|은|는)$/;
      const STOP = new Set(["방법", "무엇", "때문", "경우", "이유", "정리", "총정리", "확인", "언제", "얼마"]);
      const isTopic = (w: string) =>
        TOPIC.has(w) ||
        STOP.has(w) ||
        FUNC.test(w) ||
        kws.some((k) => k.toLowerCase().replace(/\s+/g, "").includes(w));
      const hits = searchWords.filter((w) => h.toLowerCase().includes(w) && !isTopic(w));
      const missing = hits.filter((w) => !body.includes(w));
      // 소제목이 검색어를 여러 개 담았다면 그중 하나라도 본문에 있으면 통과로 본다.
      if (hits.length && missing.length === hits.length) {
        push(
          "heading-body-match",
          "ERROR",
          `q${i + 1} 소제목에 얹은 검색어를 본문이 쓰지 않습니다: "${h}" — 본문에 ${missing.slice(0, 3).join(", ")} 가 없습니다`
        );
      }
    }
  }

  // 15. 각 섹션 첫 문장은 결론 — 질문으로 시작하면 안 된다
  for (let i = 0; i < secs.length; i++) {
    const body: string = secs[i].body ?? "";
    if (!body.trim()) {
      push("template-section-body", "ERROR", `mainSections[${i}]의 body가 비었음`);
      continue;
    }
    const first = body.trim().split(/(?<=[.?!])\s|\n/)[0] ?? "";
    if (first.trim().endsWith("?")) {
      push(
        "template-section-lead",
        "WARN",
        `mainSections[${i}] 첫 문장이 질문 — 결론부터 써야 한다: "${first.slice(0, 40)}"`
      );
    }
  }

  // ── 15-2 ~ 15-6. 정본 템플릿에서 직접 뽑은 프로필과 대조 ──
  // 기준값을 사람이 옮겨 적지 않는다. docs/moneywiki-article-template.html 이 바뀌면
  // template-profile.mjs 가 새 기준을 산출하고 아래 검사가 자동으로 따라간다.

  const kindOf = (s: any): string => {
    if (s.compareTable) return "table";
    const w = s.widgets?.[0];
    return w ? String(w.type) : "";
  };

  // 15-2. 비주얼 — "전 섹션 필수"를 풀고 하한만 둔다.
  //
  // 예전에는 모든 섹션에 비주얼이 없으면 ERROR였다. 그래서 주제와 무관하게
  // 칸을 채우게 됐고, 표 하나로 끝나는 게 나은 글도 8개를 억지로 채웠다.
  // "복사 붙여넣기가 아니라 주제에 맞게" 넣으려면 이 강제를 풀어야 한다.
  // 대신 하한(과반)만 지키고, 판박이 배치는 verify-repetition 이 ERROR로 막는다.
  {
    const withViz = secs.filter((s: any) => kindOf(s)).length;
    const ratio = secs.length ? withViz / secs.length : 1;
    if (ratio < 0.5) {
      push(
        "template-visual-first",
        "ERROR",
        `비주얼이 있는 섹션 ${withViz}/${secs.length} — 글의 절반 이상은 표·체크리스트·수치 상자로 보여 주세요`
      );
    }
  }

  // 15-3. 비주얼 다양성 — 템플릿은 같은 종류를 연달아 쓰지 않는다
  const kinds = secs.map(kindOf).filter(Boolean);
  let run = 1;
  for (let i = 1; i < kinds.length; i++) {
    run = kinds[i] === kinds[i - 1] ? run + 1 : 1;
    if (run > TPL.sections.maxSameKindRun) {
      push(
        "template-visual-variety",
        "WARN",
        `q${i}과 q${i + 1}이 같은 비주얼(${kinds[i]}) 연속 — 템플릿은 매번 다른 종류를 씁니다`
      );
      break;
    }
  }
  const distinct = new Set(kinds).size;
  const minKinds = Math.min(3, TPL.sections.minVisualKinds);
  if (distinct < minKinds) {
    push(
      "template-visual-variety",
      "WARN",
      `비주얼 종류가 ${distinct}가지 — 템플릿은 ${TPL.sections.minVisualKinds}가지를 씁니다 (최소 ${minKinds})`
    );
  }

  // 15-4. eyebrow 라벨 — 존재와 중복은 구조(ERROR), 길이는 분량(WARN)
  if (TPL.invariant.eyebrowRequired) {
    const len = TPL.indicative.eyebrowLen;
    for (let i = 0; i < secs.length; i++) {
      const eb: string = (secs[i].eyebrow ?? "").trim();
      if (!eb) {
        push("template-eyebrow", "ERROR", `q${i + 1}에 eyebrow 라벨이 없음 (템플릿 예: ${TPL.eyebrow.samples.slice(0, 3).join(", ")})`);
      } else if ((secs[i].heading ?? "").includes(eb)) {
        push("template-eyebrow", "ERROR", `q${i + 1} eyebrow "${eb}"가 소제목에 그대로 들어 있음 — 같은 말 반복`);
      } else if (eb.length < len.min || eb.length > len.max) {
        push("template-eyebrow", "WARN", `q${i + 1} eyebrow "${eb}" ${eb.length}자 — 권장 ${len.target}자`);
      }
    }
  }

  // 15-5. 내부 유도 — 스포크·허브·계산기로 넘기는 링크와 유도 문장
  const links = secs.filter((s: any) => s.link);
  if (links.length < 2) {
    push(
      "internal-link",
      "WARN",
      `본문 내부 링크 ${links.length}개 — 최소 2개를 권장합니다 (스포크·계산기 유도)`
    );
  }
  for (const s of links) {
    const bridge: string = s.link.bridge ?? "";
    if (bridge.trim().length < 15) {
      push(
        "internal-link-bridge",
        "ERROR",
        `"${s.link.label}" 링크에 유도 문장이 없거나 너무 짧음 — 뜬금없는 링크는 넣지 않습니다`
      );
    }
  }

  // 15-6. 타이틀 ↔ 소제목 일치
  //
  // 소제목 개수는 정해진 목표가 없다. 타이틀이 나열한 항목이 곧 본문 구성이다.
  // 타이틀이 4개를 약속하면 섹션도 그 4개를 다뤄야 하고, 억지로 8개까지 늘리면
  // 약속하지 않은 이야기가 섞여 검색해서 들어온 사람의 기대와 어긋난다.
  //
  // 타이틀에서 나열 항목을 뽑아 각 항목이 소제목이나 라벨에 반영됐는지 본다.
  const titleItems = String(article.meta?.title ?? "")
    .replace(/\(\d{4}\)|20\d{2}년?/g, " ")
    .split(/[·,、|]|부터|까지|그리고|및/)
    .map((t: string) => t.trim())
    .filter((t: string) => t.length >= 2 && !kws.some((k) => k === t));

  const sectionText = secs
    .map((s: any) => `${s.eyebrow ?? ""} ${s.heading ?? ""}`)
    .join(" ");

  const uncovered = titleItems.filter((item: string) => {
    // 항목의 핵심 2글자라도 섹션 어딘가에 나오면 다뤘다고 본다
    const core = item.replace(/\s+/g, "");
    for (let i = 0; i + 2 <= core.length; i++) {
      if (sectionText.includes(core.slice(i, i + 2))) return true;
    }
    return false;
  });
  const missing = titleItems.filter((t: string) => !uncovered.includes(t));
  if (missing.length > 0) {
    push(
      "title-section-match",
      // WARN이던 것을 올린다. 경고로 두니 타이틀만 갈아 끼우고 본문은 그대로 두는 일이
      // 실제로 벌어졌다. 타이틀이 약속한 항목은 소제목이 답해야 한다.
      "ERROR",
      `타이틀이 약속한 항목이 본문에 없음: ${missing.join(", ")} — 소제목으로 다루거나 타이틀에서 빼세요`
    );
  }

  // 분량은 참고값이다. 주제에 따라 달라지므로 WARN까지만.
  const sc = TPL.indicative.sections;
  if (secs.length > sc.max) {
    push("template-sections", "WARN", `mainSections ${secs.length}개 — 권장 ${sc.min}~${sc.max}개. 타이틀이 약속한 만큼만 쓰세요`);
  }
  const kfB = TPL.indicative.keyFactsRows;
  if (kf.length > 0 && (kf.length < kfB.min || kf.length > kfB.max)) {
    push("template-keyFacts", "WARN", `keyFacts ${kf.length}행 — 권장 ${kfB.min}~${kfB.max}행 (소제목 개수와 무관한 사실 요약표입니다)`);
  }
  const faqCount = article.context?.faqList?.length ?? 0;
  const faqB = TPL.indicative.faqItems;
  if (faqCount > 0 && faqCount < faqB.min) {
    push("template-faq", "WARN", `FAQ ${faqCount}개 — 권장 ${faqB.min}~${faqB.max}개`);
  }

  // 16. summary — 정확히 3줄
  const sum: any[] = article.summary ?? [];
  if (sum.length !== 3) {
    push("template-summary", "ERROR", `summary가 ${sum.length}줄 (정확히 3줄이어야 함)`);
  }

  // 17. AdSense 안전 — 과장 표현 금지
  const allText = [
    title,
    desc,
    hook,
    ...secs.map((s: any) => s.body ?? ""),
    ...(article.context?.faqList ?? []).map((f: any) => f.answer ?? ""),
  ].join(" ");
  const HYPE = ["축하해요", "축하합니다", "확정 지급", "무조건 받으실", "100% 지급", "누구나 받을 수 있"];
  const hit = HYPE.filter((h) => allText.includes(h));
  if (hit.length > 0) {
    push("adsense-hype", "ERROR", `과장 표현 사용: ${hit.join(", ")}`);
  }

  return issues;
}

/** 보호 자산 침범 검사 — 계산기 54개와 양식 다운로드는 어떤 경우에도 글이 덮지 않는다. */
function verifyProtected(articles: any[]): VerifyIssue[] {
  const issues: VerifyIssue[] = [];
  const listPath = path.join(ROOT, "scripts", "calc-protected-slugs.json");
  if (!fs.existsSync(listPath)) return issues;

  let raw: any;
  try {
    raw = JSON.parse(fs.readFileSync(listPath, "utf8"));
  } catch {
    return issues;
  }
  const slugs: string[] = Array.isArray(raw)
    ? raw.map((s) => (typeof s === "string" ? s : s?.slug)).filter(Boolean)
    : [];
  const protectedSet = new Set(slugs);

  for (const a of articles) {
    if (protectedSet.has(a.slug)) {
      issues.push({
        slug: a.slug,
        rule: "protected-calculator",
        severity: "ERROR",
        message: `계산기 보호 slug를 글이 덮어쓰려 함. scripts/calc-protected-slugs.json 참조`,
      });
    }
    if (/^forms(\/|$)/.test(a.slug ?? "")) {
      issues.push({
        slug: a.slug,
        rule: "protected-forms",
        severity: "ERROR",
        message: "양식 다운로드(src/app/forms) 경로는 글이 점유할 수 없음",
      });
    }
  }
  return issues;
}

async function main() {
  console.log("[verify-articles] 시작");
  const articles = await loadAllArticles();
  console.log(`[verify-articles] ${articles.length}개 글 검증`);

  const all: VerifyIssue[] = [];
  for (const a of articles) {
    all.push(...verifyArticle(a));
  }
  all.push(...verifyProtected(articles));

  const errors = all.filter((i) => i.severity === "ERROR");
  const warns = all.filter((i) => i.severity === "WARN");

  for (const issue of all) {
    const tag = issue.severity === "ERROR" ? "✗" : "!";
    console.log(`${tag} [${issue.severity}] ${issue.slug} / ${issue.rule}`);
    console.log(`    ${issue.message}`);
  }

  console.log("");
  console.log(`[verify-articles] 완료 — ERROR ${errors.length}, WARN ${warns.length}`);

  if (errors.length > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[verify-articles] 실패", err);
  process.exit(1);
});
