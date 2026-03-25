#!/usr/bin/env node
/**
 * TSX 글 품질 자동 검증 (PostToolUse 훅)
 * Write/Edit 후 src/app/w/{slug}/page.tsx 파일에 자동 실행
 */

const fs = require("fs");
const path = require("path");

// ─── 입력 파싱 (stdin JSON — Claude Code hooks 표준) ───
const CALC_SLUGS = require(require("path").join(__dirname, "calc-protected-slugs.json"));

let filePath = "";

// PostToolUse: stdin JSON 또는 TOOL_INPUT env (하위호환)
function parseInput(raw) {
  try {
    const data = JSON.parse(raw);
    const ti = data.tool_input || data;
    return ti.file_path || ti.path || "";
  } catch { return ""; }
}

// stdin 시도
let stdinData = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => { stdinData += chunk; });
process.stdin.on("end", () => {
  filePath = parseInput(stdinData) || parseInput(process.env.TOOL_INPUT || "{}");
  runValidation();
});
// stdin이 즉시 닫히는 경우 (env var fallback)
setTimeout(() => {
  if (!filePath) {
    filePath = parseInput(process.env.TOOL_INPUT || process.env.INPUT || "{}");
    if (filePath) runValidation();
  }
}, 100);

function runValidation() {
// page.tsx 파일만, 계산기 제외
if (!filePath.includes("src/app/w/") || !filePath.endsWith("page.tsx")) process.exit(0);
if (CALC_SLUGS.some(s => filePath.includes(`/w/${s}/`))) process.exit(0);

// ─── 파일 읽기 ────────────────────────────────────────
if (!fs.existsSync(filePath)) process.exit(0);
const src = fs.readFileSync(filePath, "utf8");

const ERRORS = [];
const WARNINGS = [];

// ─── -1. 템플릿 구조 강제 검증 (빌드 실패 방지) ──────
// article-ui import 감지 → 즉시 FAIL
const articleUiImport = src.match(/import\s+\{[^}]+\}\s+from\s+["']@\/components\/article-ui[^"']*["']/g);
if (articleUiImport) {
  ERRORS.push(`❌ article-ui import 감지 → 빌드 에러 원인! → 파일 안에서 자체 정의해야 해요\n    발견: ${articleUiImport[0]}`);
}
// "use client" 확인
if (!/^["']use client["']/.test(src)) {
  ERRORS.push(`❌ "use client" 없음 → useState 빌드 에러`);
}
// Sidebar 자체 정의 확인 (article-ui Sidebar는 props 불일치)
if (/import.*Sidebar.*from.*article-ui/.test(src)) {
  ERRORS.push(`❌ article-ui Sidebar import → props 불일치 빌드 에러 → 자체 정의 필요`);
}
// ArticleLayout 사용 금지
if (/import.*ArticleLayout.*from.*article-ui/.test(src)) {
  ERRORS.push(`❌ ArticleLayout import → 자체 레이아웃으로 교체 필요`);
}

// ─── 0. Q1-Q4 필수 사고 + Q→구조 매핑 검증 ─────────
const qComments = {
  q1: src.match(/\/\/\s*Q1[.:]?\s*(.+)/),
  q2: src.match(/\/\/\s*Q2[.:]?\s*(.+)/),
  q3: src.match(/\/\/\s*Q3[.:]?\s*(.+)/),
  q4: src.match(/\/\/\s*Q4[.:]?\s*(.+)/),
};

// 0-A. Q1~Q4 주석 존재 여부
if (!qComments.q1) ERRORS.push(`❌ Q1 주석 없음 — "이 키워드를 검색하는 사람은 지금 어떤 상황인가?" 필수`);
if (!qComments.q2) ERRORS.push(`❌ Q2 주석 없음 — "이 사람이 글을 읽고 할 수 있어야 하는 행동은?" 필수`);
if (!qComments.q3) ERRORS.push(`❌ Q3 주석 없음 — "이 행동을 하려면 반드시 알아야 하는 정보는?" 필수`);
if (!qComments.q4) ERRORS.push(`❌ Q4 주석 없음 — "이 정보를 가장 잘 전달하는 형태는?" 필수`);

// 0-B. Q1~Q4 내용이 구체적인지 (10자 미만이면 불충분)
for (const [key, match] of Object.entries(qComments)) {
  if (match && match[1].trim().length < 10) {
    ERRORS.push(`❌ ${key.toUpperCase()} 주석이 너무 짧음 (${match[1].trim().length}자) — 구체적인 상황/행동/정보/형태 기술 필수`);
  }
}

// 0-C. Q2 글 형태 분류 → 구조 일치 검증
if (qComments.q2) {
  const q2text = qComments.q2[1];
  // Q2에 "비교" "고른다" "선택" 있으면 → 비교표 중심 글이어야 함 (table 태그 필수)
  if (/비교|고른다|골라|선택/.test(q2text)) {
    const tableCount = (src.match(/<table/g) || []).length;
    if (tableCount < 1) ERRORS.push(`❌ Q2가 "비교/선택" 유형인데 <table> 없음 — 비교표 필수`);
  }
  // Q2에 "절차" "신청" "가입" "등록" 있으면 → Steps 컴포넌트 필수
  if (/절차|신청|가입|등록/.test(q2text)) {
    if (!/\bSteps\b/.test(src)) WARNINGS.push(`⚠️ Q2가 "절차/신청" 유형인데 Steps 컴포넌트 없음 — Steps 사용 권장`);
  }
  // Q2에 "확인" "자격" "대상" 있으면 → EligibilityChecker 또는 체크 인터랙티브 권장
  if (/자격.*확인|대상.*확인|확인.*자격/.test(q2text)) {
    if (!/EligibilityChecker|input|onChange|useState/.test(src)) WARNINGS.push(`⚠️ Q2가 "자격 확인" 유형인데 인터랙티브 요소 없음 — 체커/계산기 권장`);
  }
}

// 0-D. Q3 정보 항목 수 vs H2 개수 비교 (Q3의 "/" 구분자 수로 추정)
if (qComments.q3) {
  const q3text = qComments.q3[1];
  const q3items = q3text.split(/[/／]/).filter(s => s.trim().length > 3).length;
  const h2count = [...src.matchAll(/<H2>([\s\S]*?)<\/H2>/g)].length;
  // FAQ H2는 정보 항목이 아니므로 -1
  const contentH2 = h2count > 0 ? h2count - 1 : 0;  // FAQ 제외
  if (q3items > 0 && contentH2 > q3items + 2) {
    WARNINGS.push(`⚠️ Q3 정보 항목 약 ${q3items}개인데 H2가 ${h2count}개 — Q3에 없는 내용이 H2로 들어갔을 수 있음`);
  }
}

// 0-E. Q1 → 서론 첫 문장 공감 체크 (첫 <p> 태그 내용)
const firstP = src.match(/<p\s+style=\{\s*\{\s*\.\.\.body[^}]*\}[^>]*>([\s\S]*?)<\/p>/);
if (qComments.q1 && firstP) {
  const intro = firstP[1].replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").trim();
  // 서론이 제도 설명으로 시작하면 경고 (독자 상황 공감이 아닌 경우)
  if (/^[가-힣]+은\s|^[가-힣]+는\s/.test(intro) && !/죠|하죠|싶죠|되죠|나죠|보죠|모르|궁금|부담|고민|막막|헷갈/.test(intro.slice(0, 50))) {
    WARNINGS.push(`⚠️ 서론 첫 문장이 제도 설명으로 시작 — Q1 독자 상황 공감(질문/고민)으로 시작해야 해요`);
  }
}

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

// ─── 3. 컴포넌트 체크 (FAQ 필수 + 시각화 3종 이상) ───
if (!/\bFAQ\b/.test(src)) ERRORS.push(`❌ FAQ 컴포넌트 누락 (필수)`);

const VISUAL_COMPONENTS = [
  "Calculator", "EligibilityChecker", "Steps", "DocTable", "Checklist",
  "CompareTable", "Timeline", "IncomeBracket", "TaxRateTable", "DateCalc",
  "FlowChart", "PenaltyTable", "RegionTable", "DiagnoseCard", "SupportAmountCard",
  "GreenBox", "BorderBox",
];
const usedCount = VISUAL_COMPONENTS.filter(c => new RegExp(`\\b${c}\\b`).test(src)).length;
if (usedCount < 3) ERRORS.push(`❌ 시각화 컴포넌트 ${usedCount}개 — 최소 3종 필요`);

// ─── 4. AI 냄새 단어 ─────────────────────────────────
const AI_WORDS = [
  "또한 ", "결론적으로", "다양한 ", "매우 중요", "확인하세요",
  "총정리", "있거든요", "알아보겠습니다", "살펴보겠습니다",
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
// 가짜 항목 감지: 관심/의향/궁금증은 자격 조건이 아님
const checkLabels = [...src.matchAll(/label:\s*["'](.*?)["']/g)].map(m => m[1]);
const fakeChecks = checkLabels.filter(l => /궁금|알고 싶|궁금해요|알아보|확인하|하고 싶|받고 싶|할 예정|할 계획/.test(l));
if (fakeChecks.length > 0) ERRORS.push(`❌ EligibilityChecker 가짜 항목 (조건이 아닌 관심/의향): "${fakeChecks[0]}"`);

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
} // end runValidation
