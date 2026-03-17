#!/usr/bin/env node
/**
 * TSX 글 품질 자동 검증 (PostToolUse 훅)
 * Write/Edit 후 src/app/w/{slug}/page.tsx 파일에 자동 실행
 */

const fs = require("fs");
const path = require("path");

// ─── 입력 파싱 ────────────────────────────────────────
let filePath = "";
try {
  const input = JSON.parse(process.env.TOOL_INPUT || process.env.INPUT || "{}");
  filePath = input.file_path || input.path || "";
} catch {
  process.exit(0);
}

// page.tsx 파일만, 계산기 제외
if (!filePath.includes("src/app/w/") || !filePath.endsWith("page.tsx")) process.exit(0);

const CALC_SLUGS = [
  "실업급여-계산기","퇴직금-계산기","연말정산-계산기","4대보험료-계산기",
  "DSR-계산기","건강보험료-계산기","국민연금-수령액-계산기","근로소득세-계산기",
  "대출상환-계산기","대출이자-계산기","양도소득세-계산기","연봉-계산기",
  "시급-계산기","주휴수당-계산기","취득세-계산기","증여세-계산기",
  "상속세-계산기","종합부동산세-계산기","재산세-계산기",
];
if (CALC_SLUGS.some(s => filePath.includes(`/w/${s}/`))) process.exit(0);

// ─── 파일 읽기 ────────────────────────────────────────
if (!fs.existsSync(filePath)) process.exit(0);
const src = fs.readFileSync(filePath, "utf8");

const ERRORS = [];
const WARNINGS = [];

// ─── 1. 타이틀 규칙 ──────────────────────────────────
const h1Match = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
const titleText = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";

if (titleText) {
  if (titleText.length > 40) ERRORS.push(`❌ 타이틀 40자 초과 (${titleText.length}자): "${titleText.slice(0, 30)}..."`);
  if (/총정리|완벽정리|A to Z|한눈에/.test(titleText)) ERRORS.push(`❌ 금지 단어 (타이틀): 총정리/완벽정리/A to Z/한눈에`);
  if (titleText.includes("|")) ERRORS.push(`❌ 파이프형(|) 타이틀 금지`);
  if (/합니다|입니다/.test(titleText)) ERRORS.push(`❌ 타이틀에 합니다/입니다 금지`);
}

// ─── 2. H2 소제목 규칙 ───────────────────────────────
const h2Matches = [...src.matchAll(/<H2>([\s\S]*?)<\/H2>/g)].map(m => m[1].trim());

if (h2Matches.length < 4) ERRORS.push(`❌ H2 소제목 최소 4개 필요 (현재 ${h2Matches.length}개)`);

h2Matches.forEach(h2 => {
  if (/^[0-9]+\./.test(h2)) ERRORS.push(`❌ H2에 번호 금지: "${h2}"`);
  if (/(ㅡ|—|–)/.test(h2)) ERRORS.push(`❌ H2에 대시 금지: "${h2}"`);
  if (/총정리|완벽정리/.test(h2)) ERRORS.push(`❌ H2에 금지 단어: "${h2}"`);
});

// 같은 톤 3연속 체크 (질문형)
const questionH2 = h2Matches.map(h => h.endsWith("?"));
let consecutiveQ = 0;
for (const isQ of questionH2) {
  if (isQ) { consecutiveQ++; if (consecutiveQ >= 3) WARNINGS.push(`⚠️ 질문형 H2 3연속 — 톤 변화 필요`); }
  else consecutiveQ = 0;
}

// ─── 3. 필수 컴포넌트 체크 ───────────────────────────
const REQUIRED = [
  { name: "EligibilityChecker", pattern: /EligibilityChecker/ },
  { name: "Calculator",         pattern: /\bCalculator\b/ },
  { name: "Steps",              pattern: /\bSteps\b/ },
  { name: "DocTable",           pattern: /\bDocTable\b/ },
  { name: "Checklist",          pattern: /\bChecklist\b/ },
  { name: "FAQ",                pattern: /\bFAQ\b/ },
];
for (const { name, pattern } of REQUIRED) {
  if (!pattern.test(src)) ERRORS.push(`❌ 필수 컴포넌트 누락: ${name}`);
}

// ─── 4. AI 냄새 단어 ─────────────────────────────────
const AI_WORDS = [
  "또한 ", "결론적으로", "다양한 ", "매우 중요", "확인하세요",
  "총정리", "있거든요", " 있어요", "알아보겠습니다", "살펴보겠습니다",
  " — ", "정리해드릴게요", "알아볼게요",
];
for (const word of AI_WORDS) {
  const count = (src.match(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  if (count > 0) ERRORS.push(`❌ AI 냄새 단어 "${word.trim()}" ${count}회`);
}

// ─── 5. 구어체 위반 ──────────────────────────────────
const FORMAL = ["합니다.", "입니다.", "됩니다.", "있습니다.", "없습니다.", "받습니다."];
let formalCount = 0;
for (const f of FORMAL) {
  formalCount += (src.match(new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
}
if (formalCount > 0) ERRORS.push(`❌ 합니다/입니다 체 ${formalCount}회 — 구어체(~해요/~이에요)로 변경`);

// ─── 6. EligibilityChecker 품질 ──────────────────────
// "궁금해요" 류 가짜 항목 감지
const checkLabels = [...src.matchAll(/label:\s*["'](.*?)["']/g)].map(m => m[1]);
const fakeChecks = checkLabels.filter(l => /궁금|알고 싶|궁금해요|알아보|확인하/.test(l));
if (fakeChecks.length > 0) ERRORS.push(`❌ EligibilityChecker 가짜 항목 (조건이 아닌 궁금증): "${fakeChecks[0]}"`);

// ─── 7. Steps 크램드 텍스트 감지 ─────────────────────
// 단락 텍스트에 "1단계:", "2단계:" 직접 서술 (Steps 컴포넌트 대신 텍스트로 쓴 경우)
const crammedSteps = (src.match(/[1-9]단계[:：]/g) || []).length;
// Steps 컴포넌트 데이터 안에 있는 건 제외, 일반 텍스트 p 태그 안에 있는지 확인
const inParagraph = (src.match(/<p[^>]*>[^<]*[1-9]단계[:：]/g) || []).length;
if (inParagraph > 0) ERRORS.push(`❌ 단락에 "N단계:" 직접 서술 — Steps 컴포넌트 사용 필요`);

// ─── 8. 섹션 텍스트 분량 ─────────────────────────────
// H2 이후 컴포넌트 바로 나오는 경우 (텍스트 없이 컴포넌트만)
const noTextBeforeComp = (src.match(/<H2>[^<]+<\/H2>\s*<SectionBadge>/g) || []).length;
if (noTextBeforeComp > 0) WARNINGS.push(`⚠️ H2 바로 다음 SectionBadge — 컴포넌트 앞 설명 텍스트 2~3문단 필요`);

// ─── 결과 출력 ────────────────────────────────────────
const slug = filePath.match(/src\/app\/w\/([^/]+)\/page\.tsx/)?.[1] || filePath;
const total = ERRORS.length + WARNINGS.length;

if (total === 0) {
  console.log(`✅ [품질 PASS] ${slug} — 모든 규칙 통과`);
  process.exit(0);
} else {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`📋 TSX 글 품질 검증: ${slug}`);
  console.log(`${"─".repeat(60)}`);
  if (ERRORS.length > 0) {
    console.log(`\n[오류 ${ERRORS.length}개]`);
    ERRORS.forEach(e => console.log(`  ${e}`));
  }
  if (WARNINGS.length > 0) {
    console.log(`\n[경고 ${WARNINGS.length}개]`);
    WARNINGS.forEach(w => console.log(`  ${w}`));
  }
  console.log(`${"─".repeat(60)}\n`);
  // 오류 있으면 비정상 종료 (훅에서 경고로 표시)
  if (ERRORS.length > 0) process.exit(1);
  process.exit(0);
}
