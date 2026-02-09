#!/usr/bin/env node

/**
 * 키워드 검증 훅
 * keyword-111.md 강제 규칙 검증
 */

// 동의어 동사 그룹 (같은 행위)
const SYNONYM_VERBS = [
  ['가입', '신청', '접수', '등록'],
  ['확인', '조회', '검색', '찾기'],
  ['해지', '탈퇴', '취소', '해약'],
  ['변경', '수정', '정정'],
  ['발급', '신청', '요청'],
];

// 동의어 측면 그룹 (같은 질문 = 누가?/어떻게?/언제?/얼마?)
const SYNONYM_ASPECTS = [
  // 누가? (자격 관련 - 전부 동의어!)
  ['자격', '조건', '요건', '대상', '기준', '나이', '소득', '연령'],
  // 어떻게?
  ['방법', '절차', '안내', '하는법', '신청법'],
  // 언제?
  ['기간', '기한', '시기', '일정', '날짜'],
  // 얼마?
  ['금액', '비용', '가격', '수수료', '이자', '한도'],
  // 무엇?
  ['서류', '준비물', '문서', '첨부', '구비서류'],
  // 혜택 (얼마?와 유사)
  ['혜택', '지원금', '지원', '보조', '매칭금'],
  // 조회 관련 (전부 같은 행위)
  ['잔액', '내역', '계좌', '현황'],
];

// 부자연스러운 타이틀 패턴
const UNNATURAL_PATTERNS = [
  /과\s+\w+\s+금액$/,  // "~과 ~ 금액" 으로 끝남
  /와\s+\w+\s+금액$/,  // "~와 ~ 금액" 으로 끝남
  /조건과\s+혜택\s+금액/,  // "조건과 혜택 금액"
];

function findSynonymGroup(word, groups) {
  for (const group of groups) {
    if (group.includes(word)) {
      return group;
    }
  }
  return null;
}

function areSynonyms(word1, word2, groups) {
  const group1 = findSynonymGroup(word1, groups);
  const group2 = findSynonymGroup(word2, groups);

  if (group1 && group2 && group1 === group2) {
    return true;
  }
  return false;
}

function validateKeywords(data) {
  const errors = [];
  const warnings = [];

  const { title, keywords } = data;

  // 규칙 1: 타이틀 자연스러움 검사
  for (const pattern of UNNATURAL_PATTERNS) {
    if (pattern.test(title)) {
      errors.push(`❌ 규칙3 위반: 타이틀이 부자연스러움 - "${title}"`);
    }
  }

  // 규칙 2: 키워드에서 동사 추출 및 동의어 검사
  const verbs = new Set();
  const aspects = new Set();

  for (const kw of keywords) {
    const parts = kw.split(' ').slice(1); // 시드 제외
    if (parts.length >= 2) {
      verbs.add(parts[0]);
      aspects.add(parts[parts.length - 1]);
    }
  }

  const verbList = Array.from(verbs);
  const aspectList = Array.from(aspects);

  // 동사 동의어 검사
  for (let i = 0; i < verbList.length; i++) {
    for (let j = i + 1; j < verbList.length; j++) {
      if (areSynonyms(verbList[i], verbList[j], SYNONYM_VERBS)) {
        errors.push(`❌ 규칙1 위반: "${verbList[i]}" ≈ "${verbList[j]}" 동의어 동사! 2x2 불가!`);
      }
    }
  }

  // 측면 동의어 검사
  for (let i = 0; i < aspectList.length; i++) {
    for (let j = i + 1; j < aspectList.length; j++) {
      if (areSynonyms(aspectList[i], aspectList[j], SYNONYM_ASPECTS)) {
        errors.push(`❌ 규칙4 위반: "${aspectList[i]}" ≈ "${aspectList[j]}" 동의어 측면!`);
      }
    }
  }

  // 규칙 4: 4개 다른 질문 검사
  if (aspectList.length < 4) {
    warnings.push(`⚠️ 측면이 ${aspectList.length}개만 있음 (4개 권장)`);
  }

  // 키워드 중복 검사
  const uniqueKeywords = new Set(keywords);
  if (uniqueKeywords.size !== keywords.length) {
    errors.push(`❌ 키워드 중복 발견!`);
  }

  return { errors, warnings, valid: errors.length === 0 };
}

// 테스트
function runTests() {
  console.log('=== 키워드 검증 테스트 ===\n');

  // 좋은 예시: 법인세 2x2
  const good1 = {
    title: '법인세 신고 기한과 납부 방법',
    keywords: [
      '법인세 신고 기한',
      '법인세 납부 방법',
      '법인세 신고 방법',
      '법인세 납부 기한',
    ]
  };

  console.log('테스트 1: 법인세 (좋은 예시)');
  const result1 = validateKeywords(good1);
  console.log(result1.valid ? '✅ 통과' : '❌ 실패');
  result1.errors.forEach(e => console.log(e));
  console.log('');

  // 나쁜 예시: 가입≈신청
  const bad1 = {
    title: '디딤씨앗통장 가입 조건과 신청 방법',
    keywords: [
      '디딤씨앗통장 가입 조건',
      '디딤씨앗통장 신청 방법',
      '디딤씨앗통장 가입 방법',
      '디딤씨앗통장 신청 조건',
    ]
  };

  console.log('테스트 2: 가입≈신청 (나쁜 예시)');
  const result2 = validateKeywords(bad1);
  console.log(result2.valid ? '✅ 통과' : '❌ 실패');
  result2.errors.forEach(e => console.log(e));
  console.log('');

  // 좋은 예시: 1x4
  const good2 = {
    title: '희망저축계좌2 가입 조건 방법 기간 서류 총정리',
    keywords: [
      '희망저축계좌2 가입 조건',
      '희망저축계좌2 가입 방법',
      '희망저축계좌2 가입 기간',
      '희망저축계좌2 가입 서류',
    ]
  };

  console.log('테스트 3: 1x4 (좋은 예시)');
  const result3 = validateKeywords(good2);
  console.log(result3.valid ? '✅ 통과' : '❌ 실패');
  result3.errors.forEach(e => console.log(e));
  result3.warnings.forEach(w => console.log(w));
  console.log('');

  // 부자연스러운 타이틀
  const bad2 = {
    title: '희망저축계좌2 가입 조건과 혜택 금액',
    keywords: [
      '희망저축계좌2 가입 조건',
      '희망저축계좌2 혜택 금액',
      '희망저축계좌2 가입 금액',
      '희망저축계좌2 혜택 조건',
    ]
  };

  console.log('테스트 4: 부자연스러운 타이틀 (나쁜 예시)');
  const result4 = validateKeywords(bad2);
  console.log(result4.valid ? '✅ 통과' : '❌ 실패');
  result4.errors.forEach(e => console.log(e));
  console.log('');
}

// CLI 실행
if (require.main === module) {
  runTests();
}

module.exports = { validateKeywords, SYNONYM_VERBS, SYNONYM_ASPECTS };
