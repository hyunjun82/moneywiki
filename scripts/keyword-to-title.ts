/**
 * 키워드 → 롱테일 타이틀 생성기
 *
 * 입력: "퇴직금 1년 미만"
 * 출력: "퇴직금 1년 미만 지급·계산·조건 총정리"
 *
 * 관련 질문 스타일로 다양한 롱테일 키워드 조합 생성
 */

// 키워드 패턴별 확장 사전 (우선순위 순)
const expansionPatterns: Record<string, string[]> = {
  // 퇴직금 관련 - 구체적인 것부터
  "퇴직금 미지급": ["신고", "처벌", "지연이자 받는 법"],
  "퇴직금 1년 미만": ["지급 조건", "계산법", "받을 수 있나"],
  "퇴직금 계산": ["평균임금", "공식", "예시"],
  "퇴직금 지연이자": ["계산", "청구", "20% 받는 법"],
  "퇴직금": ["계산", "조건", "신청 방법"],

  // 연말정산 관련
  "연말정산 신용카드": ["공제 한도", "계산법", "조건"],
  "연말정산 의료비": ["공제 조건", "한도", "몰아주기"],
  "연말정산": ["환급", "공제 항목", "신청 방법"],
  "소득공제": ["한도", "대상", "계산"],
  "세액공제": ["16.5%", "13.2%", "받는 법"],

  // 부동산 관련
  "전세 보증금": ["반환", "미반환 대처", "내용증명"],
  "전세": ["계약", "신고", "보증보험"],
  "임대차": ["갱신청구권", "계약해지", "보호법"],
  "청약": ["1순위 조건", "점수 계산", "신청"],

  // 복지 관련
  "실업급여": ["수급 조건", "신청 방법", "계산"],
  "육아휴직": ["급여 계산", "신청", "기간"],
};

// 행동 키워드 (CTR 높이는 용도)
const actionKeywords = [
  "받는 법",
  "신청 방법",
  "계산법",
  "조건",
  "절차",
  "기준",
];

// 구분자 옵션
const separators = ["·", " "];

/**
 * 메인 키워드에서 관련 확장 키워드 찾기 (정확한 매칭 우선)
 */
function findRelatedExpansions(keyword: string): string[] {
  // 1. 정확히 일치하는 패턴 먼저 찾기
  if (expansionPatterns[keyword]) {
    return expansionPatterns[keyword];
  }

  // 2. 가장 긴 매칭 패턴 찾기 (더 구체적인 것 우선)
  const matchingPatterns = Object.keys(expansionPatterns)
    .filter(pattern => keyword.includes(pattern))
    .sort((a, b) => b.length - a.length); // 긴 것 우선

  if (matchingPatterns.length > 0) {
    return expansionPatterns[matchingPatterns[0]];
  }

  return [];
}

/**
 * 롱테일 타이틀 생성
 */
function generateTitle(keyword: string, maxParts: number = 4): string {
  const expansions = findRelatedExpansions(keyword);

  if (expansions.length === 0) {
    // 기본 확장
    return `${keyword} 조건·방법·신청`;
  }

  // 상위 N개 선택
  const selectedParts = expansions.slice(0, maxParts - 1);

  // 타이틀 조합
  return `${keyword} ${selectedParts.join("·")}`;
}

/**
 * 관련 질문 스타일 생성 (구글 PAA 스타일)
 */
function generateRelatedQuestions(keyword: string): string[] {
  const questions: string[] = [];
  const expansions = findRelatedExpansions(keyword);

  // 질문 패턴
  const questionPatterns = [
    (kw: string, exp: string) => `${kw} ${exp}이 뭔가요?`,
    (kw: string, exp: string) => `${kw} ${exp} 어떻게 하나요?`,
    (kw: string, exp: string) => `${kw} ${exp} 조건은?`,
    (kw: string, exp: string) => `${kw} ${exp} 기준?`,
  ];

  for (const exp of expansions.slice(0, 4)) {
    const pattern = questionPatterns[Math.floor(Math.random() * questionPatterns.length)];
    questions.push(pattern(keyword, exp));
  }

  return questions;
}

/**
 * 파일명용 슬러그 생성
 */
function generateSlug(title: string): string {
  return title
    .replace(/[·,\s]+/g, "-")
    .replace(/[^\w가-힣-]/g, "")
    .toLowerCase();
}

// ============ 테스트 ============

const testKeywords = [
  "퇴직금 미지급",
  "퇴직금 1년 미만",
  "연말정산 소득공제",
  "전세 보증금",
  "실업급여",
];

console.log("=== 롱테일 타이틀 생성 결과 ===\n");

for (const keyword of testKeywords) {
  const title = generateTitle(keyword);
  const slug = generateSlug(title);
  const questions = generateRelatedQuestions(keyword);

  console.log(`📌 입력: "${keyword}"`);
  console.log(`   타이틀: "${title}"`);
  console.log(`   슬러그: ${slug}`);
  console.log(`   관련 질문:`);
  questions.forEach(q => console.log(`     - ${q}`));
  console.log("");
}

// ============ 사용 예시 ============
/*
실행: npx ts-node scripts/keyword-to-title.ts

결과 예시:
📌 입력: "퇴직금 미지급"
   타이틀: "퇴직금 미지급 신고·처벌·지연이자"
   슬러그: 퇴직금-미지급-신고-처벌-지연이자
   관련 질문:
     - 퇴직금 미지급 신고 어떻게 하나요?
     - 퇴직금 미지급 처벌 조건은?
     - 퇴직금 미지급 지연이자 기준?
*/

export { generateTitle, generateRelatedQuestions, generateSlug, findRelatedExpansions };
