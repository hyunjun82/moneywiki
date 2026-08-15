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
  const actionUrls: { label: string; url: string }[] = [
    ...(cta?.url ? [{ label: "heroCta", url: cta.url }] : []),
    ...(article.resolution?.steps ?? [])
      .filter((s: any) => s.action?.url)
      .map((s: any, i: number) => ({ label: `steps[${i}] ${s.action.label}`, url: s.action.url })),
    ...(article.mainSections ?? [])
      .map((s: any, i: number) => (s.cta?.url ? { label: `q${i + 1} 버튼`, url: s.cta.url } : null))
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

  // 15-2. 비주얼 먼저 — 템플릿은 모든 섹션이 비주얼을 갖는다
  if (TPL.sections.allHaveVisual) {
    const textOnly = secs
      .map((s: any, i: number) => (kindOf(s) ? -1 : i + 1))
      .filter((n: number) => n > 0);
    if (textOnly.length > 0) {
      push(
        "template-visual-first",
        "ERROR",
        `비주얼 없이 텍스트만 있는 섹션 q${textOnly.join(", q")} ` +
          `(${textOnly.length}/${secs.length}) — 템플릿은 전 섹션이 비주얼로 시작합니다`
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
      "WARN",
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
