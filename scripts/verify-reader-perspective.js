#!/usr/bin/env node
/**
 * 독자 관점 검증 에이전트 (PostToolUse 훅)
 *
 * 작성자가 아닌 독자 입장에서 냉정하게 검증:
 * 1. 문제해결 100% — 타이틀 질문에 본문이 답했는가?
 * 2. 정보 정확성 — 숫자에 출처 있는가? 숫자끼리 모순?
 * 3. 오해 소지 — 과장/확정적 표현 없는가?
 * 4. 행동 완결 — 마지막에 뭘 해야 하는지 명확한가?
 * 5. 내부링크 — 1~3개, 자연스러운 것만
 */
const fs = require("fs");
const path = require("path");

const CALC_SLUGS = require(path.join(__dirname, "calc-protected-slugs.json"));

// ─── 입력 파싱 ────────────────────────────────────────
function parseInput(raw) {
  try {
    const data = JSON.parse(raw);
    const ti = data.tool_input || data;
    return ti.file_path || ti.path || "";
  } catch { return ""; }
}

let stdinData = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { stdinData += chunk; });
process.stdin.on("end", () => {
  const filePath = parseInput(stdinData) || parseInput(process.env.TOOL_INPUT || "{}");
  runValidation(filePath);
});
setTimeout(() => {
  if (!stdinData) {
    const filePath = parseInput(process.env.TOOL_INPUT || process.env.INPUT || "{}");
    if (filePath) runValidation(filePath);
  }
}, 100);

function runValidation(filePath) {
  // page.tsx 파일만
  if (!filePath.includes("src/app/w/") || !filePath.endsWith("page.tsx")) process.exit(0);
  if (CALC_SLUGS.some(s => filePath.includes(`/w/${s}/`))) process.exit(0);
  if (!fs.existsSync(filePath)) process.exit(0);

  const src = fs.readFileSync(filePath, "utf8");
  const slug = filePath.match(/src\/app\/w\/([^/]+)\/page\.tsx/)?.[1] || filePath;

  const ERRORS = [];
  const WARNINGS = [];

  // ═══════════════════════════════════════════════════
  // 1. 문제해결 100% — 타이틀 질문에 답했는가?
  // ═══════════════════════════════════════════════════
  const h1Match = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const titleText = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").trim() : "";
  const h2All = [...src.matchAll(/<H2>([\s\S]*?)<\/H2>/g)].map(m => m[1].trim());

  // 타이틀에 질문이 있으면 본문에 직접 답이 있어야 함
  if (titleText.includes("?") || titleText.includes("얼마") || titleText.includes("어떻게") || titleText.includes("방법")) {
    // 첫 번째 H2 섹션이 답을 포함하는지 체크
    const firstH2Idx = src.indexOf("<H2>");
    const secondH2Idx = src.indexOf("<H2>", firstH2Idx + 1);
    if (firstH2Idx > -1 && secondH2Idx > -1) {
      const firstSection = src.slice(firstH2Idx, secondH2Idx);
      // 답이 없는 징후: 첫 섹션에 숫자/금액/기간이 전혀 없음
      if (titleText.includes("얼마") && !/\d+[만원%일개월년]/.test(firstSection)) {
        WARNINGS.push(`⚠️ [문제해결] 타이틀에 "얼마"가 있는데 첫 섹션에 구체적 금액/숫자 없음`);
      }
    }
  }

  // 섹션 수 대비 분량 체크 (너무 짧으면 문제해결 부족)
  const pTags = (src.match(/<p[\s>]/g) || []).length;
  if (h2All.length >= 4 && pTags < h2All.length * 3) {
    WARNINGS.push(`⚠️ [문제해결] H2 ${h2All.length}개인데 본문 문단 ${pTags}개 — 섹션당 최소 3문단 필요`);
  }

  // ═══════════════════════════════════════════════════
  // 2. 정보 정확성 — 숫자에 출처 있는가?
  // ═══════════════════════════════════════════════════
  // 세율/금액/기한 패턴 감지
  const numberPatterns = src.match(/\d+[만원억천]|\d+%|\d+일|\d+개월|\d+년|제\d+조/g) || [];
  const hasReferences = /References|출처|REFERENCES|sources/.test(src);
  const hasSourceLinks = /law\.go\.kr|nts\.go\.kr|moel\.go\.kr|hometax\.go\.kr|gov\.kr|bokjiro\.go\.kr|nps\.or\.kr|fss\.or\.kr/.test(src);

  if (numberPatterns.length >= 5 && !hasReferences && !hasSourceLinks) {
    ERRORS.push(`❌ [정보] 숫자/법조문 ${numberPatterns.length}개인데 출처 섹션(References)이나 출처 링크 없음`);
  }

  // 숫자 모순 감지: 같은 단위의 다른 값이 문맥 없이 반복
  const percentages = [...new Set(src.match(/\d+\.?\d*%/g) || [])];
  const periods = [...new Set(src.match(/(\d+)일\s*(이내|안에|내에)/g) || [])];
  // 세율 충돌: 동일한 맥락에서 다른 % (간단한 휴리스틱)
  if (percentages.length > 6) {
    WARNINGS.push(`⚠️ [정보] 퍼센트 값 ${percentages.length}종 — 독자가 혼동할 수 있으니 표로 정리 권장`);
  }

  // ═══════════════════════════════════════════════════
  // 3. 오해 소지 — 과장/확정적 표현
  // ═══════════════════════════════════════════════════
  const MISLEADING = [
    { pattern: /반드시\s*받을\s*수\s*있/g, msg: '"반드시 받을 수 있" — 조건부인데 확정 표현' },
    { pattern: /무조건\s*(받|가능|된|해당)/g, msg: '"무조건" — 예외 없는 것처럼 오해' },
    { pattern: /100%\s*(지급|환급|보장|가능)/g, msg: '"100%" — 과장 표현' },
    { pattern: /축하해요|축하드려요|축하합니다/g, msg: '"축하" — AdSense 정책 위반 위험' },
    { pattern: /대상이에요!|해당돼요!/g, msg: '"!감탄" — 과장 오해 유발' },
    { pattern: /누구나\s*(받을|신청|가능)/g, msg: '"누구나" — 자격 조건 있는데 무조건처럼' },
    { pattern: /꼭\s*(받으세요|신청하세요|확인하세요)/g, msg: '"꼭 ~하세요" — 압박성 표현' },
  ];

  for (const { pattern, msg } of MISLEADING) {
    const matches = src.match(pattern);
    if (matches) {
      ERRORS.push(`❌ [오해] ${msg} (${matches.length}회)`);
    }
  }

  // ═══════════════════════════════════════════════════
  // 4. 행동 완결 — 마지막에 뭘 해야 하는지 명확한가?
  // ═══════════════════════════════════════════════════
  // FAQ 이전 마지막 섹션에 행동 안내가 있는지
  const faqIdx = src.lastIndexOf("FAQ");
  const lastH2Idx = src.lastIndexOf("<H2>", faqIdx > -1 ? faqIdx : undefined);
  if (lastH2Idx > -1 && faqIdx > -1) {
    const lastSection = src.slice(lastH2Idx, faqIdx);
    const hasAction = /신청|접속|방문|전화|클릭|제출|준비|홈택스|복지로|고용센터|gov\.kr|정부24/.test(lastSection);
    if (!hasAction) {
      WARNINGS.push(`⚠️ [행동] 마지막 섹션에 구체적 행동 안내 없음 (신청 URL, 방문 장소 등)`);
    }
  }

  // ═══════════════════════════════════════════════════
  // 5. 내부링크 — 1~3개, 자연스러운 것만
  // ═══════════════════════════════════════════════════
  const internalLinks = (src.match(/href=["']\/w\/[^"']+["']/g) || []);
  // RelatedArticles 컴포넌트 내 링크 제외 (별도 컴포넌트)
  const relatedSection = src.match(/RELATED_ARTICLES|RelatedArticles/);

  // 본문 내 인라인 내부링크만 카운트 (a 태그 직접 사용)
  const inlineInternalLinks = (src.match(/<a\s+href=["']\/w\/[^"']+["'][^>]*>/g) || []);

  if (inlineInternalLinks.length === 0 && !relatedSection) {
    WARNINGS.push(`⚠️ [내부링크] 본문에 내부링크 0개 — 관련 글 1~3개 자연스럽게 연결 필요`);
  }
  if (inlineInternalLinks.length > 5) {
    WARNINGS.push(`⚠️ [내부링크] 본문 내부링크 ${inlineInternalLinks.length}개 — 과다. 1~3개만 자연스러운 것`);
  }

  // 외부링크 체크: 신청 외 불필요한 외부링크
  const externalLinks = (src.match(/href=["']https?:\/\/[^"']+["']/g) || []);
  const nonGovExternal = externalLinks.filter(l =>
    !/law\.go\.kr|nts\.go\.kr|moel\.go\.kr|hometax\.go\.kr|gov\.kr|bokjiro\.go\.kr|nps\.or\.kr|fss\.or\.kr|khug\.or\.kr|kinfa\.or\.kr|reb\.or\.kr|molit\.go\.kr/.test(l)
  );
  if (nonGovExternal.length > 2) {
    WARNINGS.push(`⚠️ [외부링크] 정부/공공기관 외 링크 ${nonGovExternal.length}개 — 신청 URL 외에는 내부링크 우선`);
  }

  // ═══════════════════════════════════════════════════
  // 결과 출력
  // ═══════════════════════════════════════════════════
  const total = ERRORS.length + WARNINGS.length;

  if (total === 0) {
    console.log(`✅ [독자검증 PASS] ${slug}`);
    process.exit(0);
  }

  console.log(`\n${"═".repeat(60)}`);
  console.log(`👤 독자 관점 검증: ${slug}`);
  console.log(`${"═".repeat(60)}`);
  if (ERRORS.length > 0) {
    console.log(`\n[오류 ${ERRORS.length}개] — 수정 필수`);
    ERRORS.forEach(e => console.log(`  ${e}`));
  }
  if (WARNINGS.length > 0) {
    console.log(`\n[경고 ${WARNINGS.length}개] — 검토 권장`);
    WARNINGS.forEach(w => console.log(`  ${w}`));
  }
  console.log(`${"═".repeat(60)}\n`);

  if (ERRORS.length > 0) process.exit(1);
  process.exit(0);
}
