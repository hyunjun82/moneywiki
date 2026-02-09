// 동의어 검증기 - 키워드 생성 시 동의어 중복 방지

const SYNONYM_GROUPS = [
  ['자격', '조건', '요건'],
  ['방법', '절차', '안내'],
  ['계산', '산정', '산출'],
  ['확인', '조회', '검색'],
  ['총', '전체', '모든'],
  ['상담', '문의'],
  ['비교', '차이'],
  ['신청', '접수'],
  ['대상', '자격자'],
  ['기간', '시간', '기한'],
];

/**
 * 키워드 배열에서 동의어 중복을 검사
 * @param {string[]} keywords - 검사할 키워드 배열
 * @returns {{ valid: boolean, violations: string[] }}
 */
function validateSynonyms(keywords) {
  const violations = [];
  const usedGroups = new Map(); // groupIndex -> 사용된 단어들

  keywords.forEach((keyword, idx) => {
    const words = keyword.split(' ');

    words.forEach(word => {
      SYNONYM_GROUPS.forEach((group, groupIdx) => {
        if (group.includes(word)) {
          if (usedGroups.has(groupIdx)) {
            const usedWords = usedGroups.get(groupIdx);
            const conflictWord = usedWords.find(w => w !== word);
            if (conflictWord) {
              violations.push(
                `❌ 동의어 중복: "${conflictWord}"와 "${word}"는 같은 의미 (키워드 #${idx + 1})`
              );
            }
          } else {
            usedGroups.set(groupIdx, [word]);
          }
        }
      });
    });
  });

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * 타이틀과 키워드 일치 검증
 * @param {string} title - 타이틀
 * @param {string[]} keywords - 키워드 배열
 * @returns {{ valid: boolean, violations: string[] }}
 */
function validateTitleMatch(title, keywords) {
  const violations = [];
  const titleWords = title.split(/[:\s]+/);

  keywords.forEach((keyword, idx) => {
    const keywordWords = keyword.split(' ');
    const baseWord = keywordWords[0]; // 첫 단어 (예: "개인회생")

    if (!titleWords.includes(baseWord)) {
      violations.push(
        `❌ 타이틀 불일치: "${keyword}"의 첫 단어 "${baseWord}"가 타이틀에 없음 (키워드 #${idx + 1})`
      );
    }
  });

  return {
    valid: violations.length === 0,
    violations,
  };
}

/**
 * 키워드 5개 전체 검증
 * @param {string} title - 타이틀
 * @param {string[]} keywords - 키워드 5개
 * @returns {{ valid: boolean, errors: string[] }}
 */
function validateKeywords(title, keywords) {
  const errors = [];

  // 1. 동의어 중복 검사
  const synonymResult = validateSynonyms(keywords);
  if (!synonymResult.valid) {
    errors.push(...synonymResult.violations);
  }

  // 2. 타이틀 일치 검사
  const titleResult = validateTitleMatch(title, keywords);
  if (!titleResult.valid) {
    errors.push(...titleResult.violations);
  }

  // 3. 키워드 개수 검사
  if (keywords.length !== 5) {
    errors.push(`❌ 키워드 개수: ${keywords.length}개 (5개 필요)`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

module.exports = {
  validateSynonyms,
  validateTitleMatch,
  validateKeywords,
  SYNONYM_GROUPS,
};
