#!/usr/bin/env node
/**
 * suggest-structure.js
 * 타이틀 → 검색 의도 분류 → H2 구조 + 컴포넌트 자동 제안
 *
 * 사용법:
 *   node scripts/suggest-structure.js "퇴직금에 세금이 얼마나 붙나요?"
 *   node scripts/suggest-structure.js "IRP 퇴직금, 지금 꺼내도 되나요?"
 */

const title = process.argv[2];

if (!title) {
  console.log("사용법: node scripts/suggest-structure.js \"타이틀 문자열\"");
  process.exit(1);
}

// ── 검색 의도 분류 ──────────────────────────────────────

const INTENTS = [
  {
    type: "HOW_MUCH",
    label: "얼마형",
    patterns: [/얼마/, /세금/, /금액/, /수령액/, /계산/, /몇 ?%/, /몇 ?원/],
    need: "숫자/금액을 바로 알고 싶다",
    h2Flow: [
      { component: "Calculator", role: "답 먼저 — 금액/세금 바로 계산" },
      { component: "GreenBox", role: "구조 설명 — 왜 이렇게 나오는지" },
      { component: "Steps", role: "처리/확인 절차" },
      { component: "Checklist", role: "절세/최적화 체크리스트" },
      { component: "FAQ", role: "자주 묻는 것들 (5개+)" },
    ],
    skip: ["EligibilityChecker (누구나 해당하는 주제면 불필요)"],
    optional: ["DocTable (서류가 있는 주제면 포함)"],
  },
  {
    type: "CAN_I",
    label: "가능형",
    patterns: [/할 수 있/, /되나요/, /가능/, /받을 수/, /꺼내도/, /해도 되/],
    need: "내 상황에서 가능한지 여부를 알고 싶다",
    h2Flow: [
      { component: "GreenBox", role: "결론 먼저 — 가능/불가능 조건 요약" },
      { component: "EligibilityChecker", role: "내 상황 체크 (법정 조건)" },
      { component: "Calculator", role: "금액/세금 비교" },
      { component: "Steps", role: "신청/처리 절차" },
      { component: "FAQ", role: "자주 묻는 것들 (5개+)" },
    ],
    skip: [],
    optional: ["DocTable (서류가 있으면 포함)", "Checklist (점검 항목이 있으면 포함)"],
  },
  {
    type: "HOW_TO",
    label: "방법형",
    patterns: [/방법/, /어떻게/, /절차/, /신청/, /수령/, /하려면/],
    need: "구체적인 절차/방법을 알고 싶다",
    h2Flow: [
      { component: "Steps", role: "절차 먼저 — 단계별 방법" },
      { component: "DocTable", role: "필요 서류/준비물" },
      { component: "Calculator", role: "금액 시뮬레이션" },
      { component: "Checklist", role: "진행 전 체크리스트" },
      { component: "FAQ", role: "자주 묻는 것들 (5개+)" },
    ],
    skip: ["EligibilityChecker (자격 조건이 없는 방법형이면 불필요)"],
    optional: ["EligibilityChecker (자격 조건이 있는 주제면 포함)"],
  },
  {
    type: "COMPARE",
    label: "비교형",
    patterns: [/vs/, /차이/, /비교/, /어떤 게/, /뭐가 나/, /뭐가 좋/],
    need: "두 가지 이상의 선택지를 비교하고 싶다",
    h2Flow: [
      { component: "CompareTable/DiagnoseCard", role: "비교 먼저 — 핵심 차이점" },
      { component: "Calculator", role: "금액/혜택 비교 계산" },
      { component: "Steps", role: "선택 후 절차" },
      { component: "FAQ", role: "자주 묻는 것들 (5개+)" },
    ],
    skip: ["DocTable (비교형에서는 보통 불필요)"],
    optional: ["EligibilityChecker (선택지별 자격이 다르면 포함)"],
  },
  {
    type: "WHAT_IS",
    label: "개념형",
    patterns: [/이란/, /뭔가/, /무엇/, /뭐예요/, /뭐야/],
    need: "개념/정의를 이해하고 싶다",
    h2Flow: [
      { component: "GreenBox+BorderBox", role: "정의 + 구조 먼저" },
      { component: "EligibilityChecker", role: "나에게 해당하는지 체크" },
      { component: "Calculator", role: "관련 금액 계산" },
      { component: "Steps", role: "실제 활용 절차" },
      { component: "FAQ", role: "자주 묻는 것들 (5개+)" },
    ],
    skip: [],
    optional: ["DocTable (서류가 있으면 포함)", "Checklist (점검 항목이 있으면 포함)"],
  },
];

// ── 의도 분류 ──────────────────────────────────────

function classifyIntent(title) {
  for (const intent of INTENTS) {
    for (const pattern of intent.patterns) {
      if (pattern.test(title)) {
        return intent;
      }
    }
  }
  // 기본값: 방법형
  return INTENTS.find((i) => i.type === "HOW_TO");
}

// ── 출력 ──────────────────────────────────────

const intent = classifyIntent(title);

console.log("");
console.log("=".repeat(60));
console.log(`  타이틀: "${title}"`);
console.log("=".repeat(60));
console.log("");
console.log(`  의도: ${intent.label} (${intent.type})`);
console.log(`  독자 니즈: "${intent.need}"`);
console.log("");
console.log("  제안 구조:");
console.log("  " + "-".repeat(50));

intent.h2Flow.forEach((h2, i) => {
  console.log(`  H2-${i + 1}: [${h2.component}] ${h2.role}`);
});

console.log("");

if (intent.skip.length > 0) {
  console.log("  불필요:");
  intent.skip.forEach((s) => console.log(`    - ${s}`));
  console.log("");
}

if (intent.optional.length > 0) {
  console.log("  선택:");
  intent.optional.forEach((o) => console.log(`    + ${o}`));
  console.log("");
}

console.log("=".repeat(60));
console.log("");
