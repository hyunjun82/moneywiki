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
  const why: string = article.searchIntent?.why ?? "";
  if (!/제\s*\d+\s*조/.test(why)) {
    push(
      "why-citation",
      "WARN",
      "searchIntent.why에 법령 조문(제○조) 인용이 없음"
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

  // 12. heroCta — 서론 직하 대형 CTA 1개, 공식 사이트만
  const cta = article.heroCta;
  if (!cta?.url) {
    push("template-heroCta", "ERROR", "heroCta(서론 아래 행동유도 버튼)가 없음");
  } else if (!isOfficial(cta.url)) {
    push("template-heroCta", "ERROR", `heroCta.url이 공식 사이트가 아님: ${cta.url}`);
  }

  // 13. keyFacts — 📌 핵심콕콕 7~9행
  const kf: any[] = article.keyFacts ?? [];
  if (kf.length === 0) {
    push("template-keyFacts", "ERROR", "keyFacts(핵심콕콕)가 없음");
  } else if (kf.length < 7 || kf.length > 9) {
    push("template-keyFacts", "WARN", `keyFacts가 ${kf.length}행 (템플릿 기준 7~9행)`);
  }

  // 14. mainSections 개수 + q1은 행동(신청) 섹션
  const secs: any[] = article.mainSections ?? [];
  if (secs.length < 5) {
    push("template-sections", "ERROR", `mainSections가 ${secs.length}개 (템플릿 기준 8개 안팎, 최소 5개)`);
  } else if (secs.length > 10) {
    push("template-sections", "WARN", `mainSections가 ${secs.length}개로 많음 (템플릿 기준 8개 안팎)`);
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
