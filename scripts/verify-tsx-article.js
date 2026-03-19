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

// 0-C. MAP 블록 필수 검증 ─────────────────────────────
const mapIntro = src.match(/\/\/\s*MAP-INTRO:\s*(.+)/);
const mapType  = src.match(/\/\/\s*MAP-TYPE:\s*(.+)/);
const mapH2    = src.match(/\/\/\s*MAP-H2:\s*(.+)/);
const mapComp  = src.match(/\/\/\s*MAP-COMP:\s*(.+)/);

if (!mapIntro) ERRORS.push(`❌ MAP-INTRO 없음 — "// MAP-INTRO: 서론 첫 문장 내용" 필수`);
if (!mapType)  ERRORS.push(`❌ MAP-TYPE 없음 — "// MAP-TYPE: 비교표|절차|텍스트|계산기|자격확인" 필수`);
if (!mapH2)    ERRORS.push(`❌ MAP-H2 없음 — "// MAP-H2: 섹션1 > 섹션2 > ... > FAQ" 필수`);
if (!mapComp)  ERRORS.push(`❌ MAP-COMP 없음 — "// MAP-COMP: GreenBox > Steps > BorderBox > FAQ" 필수`);

// 0-D. MAP-H2 vs 실제 H2 대조 ─────────────────────────
const h2All = [...src.matchAll(/<H2>([\s\S]*?)<\/H2>/g)].map(m => m[1].trim());
if (mapH2 && h2All.length > 0) {
  const planned = mapH2[1].split(">").map(s => s.trim()).filter(Boolean);
  // 개수 비교
  if (Math.abs(planned.length - h2All.length) > 1) {
    ERRORS.push(`❌ MAP-H2 ${planned.length}개 vs 실제 H2 ${h2All.length}개 — 불일치 (허용 오차 1개)`);
  }
  // 순서 비교: 계획한 H2 키워드가 실제 H2에 포함되는지
  planned.forEach((p, i) => {
    if (i < h2All.length) {
      const pNorm = p.replace(/\s/g, "");
      const hNorm = h2All[i].replace(/\s/g, "");
      // 계획 키워드의 핵심 단어(2글자 이상)가 실제 H2에 포함되는지
      const keywords = pNorm.match(/[가-힣a-zA-Z]{2,}/g) || [];
      const matched = keywords.some(kw => hNorm.includes(kw));
      if (!matched && pNorm !== "FAQ") {
        ERRORS.push(`❌ MAP-H2[${i+1}] "${p}" ↔ 실제 H2 "${h2All[i]}" — 키워드 불일치. MAP대로 써야 해요`);
      }
    }
  });
}

// 0-E. MAP-TYPE vs 컴포넌트 대조 ──────────────────────
if (mapType) {
  const type = mapType[1].trim();
  if (/비교표/.test(type)) {
    if ((src.match(/<table/g) || []).length < 1) ERRORS.push(`❌ MAP-TYPE "비교표"인데 <table> 없음`);
  }
  if (/절차/.test(type)) {
    if (!/\bSteps\b/.test(src)) ERRORS.push(`❌ MAP-TYPE "절차"인데 Steps 컴포넌트 없음`);
  }
  if (/계산기/.test(type)) {
    if (!/Calculator|useState|onChange|calcRefund/.test(src)) ERRORS.push(`❌ MAP-TYPE "계산기"인데 인터랙티브 요소 없음`);
  }
  if (/자격확인/.test(type)) {
    if (!/EligibilityChecker|input|onChange|useState/.test(src)) WARNINGS.push(`⚠️ MAP-TYPE "자격확인"인데 인터랙티브 요소 없음 — 체커 권장`);
  }
}

// 0-F. Q1 → 서론 첫 문장 공감 체크 ────────────────────
const firstP = src.match(/<p\s+style=\{\s*\{\s*\.\.\.body[^}]*\}[^>]*>([\s\S]*?)<\/p>/);
if (qComments.q1 && firstP) {
  const intro = firstP[1].replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").trim();
  if (/^[가-힣]+은\s|^[가-힣]+는\s/.test(intro) && !/죠|하죠|싶죠|되죠|나죠|보죠|모르|궁금|부담|고민|막막|헷갈/.test(intro.slice(0, 50))) {
    WARNINGS.push(`⚠️ 서론 첫 문장이 제도 설명으로 시작 — Q1 독자 상황 공감으로 시작해야 해요`);
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
  "정리해드릴게요", "알아볼게요",
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
