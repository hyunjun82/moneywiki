#!/usr/bin/env node

/**
 * 키워드 검증 훅
 * /keyword 명령 실행 시 자동으로 동의어 중복 및 타이틀 일치 검증
 */

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
  ['비용', '수임료', '금액', '가격'],
  ['서류', '준비물', '문서'],
];

/**
 * 키워드 배열에서 동의어 중복 검사
 */
function validateSynonyms(keywords) {
  const violations = [];
  const usedGroups = new Map();

  keywords.forEach((keyword, idx) => {
    const words = keyword.split(' ');

    words.forEach(word => {
      SYNONYM_GROUPS.forEach((group, groupIdx) => {
        if (group.includes(word)) {
          if (usedGroups.has(groupIdx)) {
            const prevWords = usedGroups.get(groupIdx);
            const conflict = prevWords.find(w => w !== word);
            if (conflict) {
              violations.push({
                group: groupIdx + 1,
                conflict: `"${conflict}"와 "${word}"`,
                keywords: [
                  keywords.find(k => k.includes(conflict)),
                  keyword
                ],
                message: `그룹${groupIdx + 1} 동의어 중복: ${conflict} ≈ ${word}`
              });
            }
          } else {
            usedGroups.set(groupIdx, [word]);
          }
        }
      });
    });
  });

  return violations;
}

/**
 * 타이틀과 키워드 일치 검증 (모든 단어 검사!)
 */
function validateTitleMatch(title, keywords) {
  const violations = [];
  const titleWords = title.split(/[:\s]+/).filter(w => w.length > 0);

  keywords.forEach((keyword, idx) => {
    const keywordWords = keyword.split(' ');

    // 모든 단어가 타이틀에 있는지 검사
    const missingWords = keywordWords.filter(word => !titleWords.includes(word));

    if (missingWords.length > 0) {
      violations.push({
        keyword,
        missingWords,
        message: `키워드 "${keyword}"의 단어 [${missingWords.join(', ')}]가 타이틀에 없음`
      });
    }
  });

  return violations;
}

/**
 * 의미 중복 검사 (순서만 다른 경우)
 */
function validateSemanticDuplication(keywords) {
  const violations = [];

  for (let i = 0; i < keywords.length; i++) {
    for (let j = i + 1; j < keywords.length; j++) {
      const words1 = keywords[i].split(' ').sort();
      const words2 = keywords[j].split(' ').sort();

      if (words1.length === words2.length &&
          words1.every((w, idx) => w === words2[idx])) {
        violations.push({
          keywords: [keywords[i], keywords[j]],
          message: `의미 중복: "${keywords[i]}" ≈ "${keywords[j]}" (단어 순서만 다름)`
        });
      }
    }
  }

  return violations;
}

/**
 * 4. 베이스 키워드 중복 검사
 * 한 키워드가 2개 이상의 다른 키워드에 완전히 포함되면 중복
 */
function validateRedundantBaseKeywords(keywords) {
  const violations = [];

  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i].trim();
    const containedIn = [];

    for (let j = 0; j < keywords.length; j++) {
      if (i !== j) {
        const otherKeyword = keywords[j].trim();
        // Check if current keyword is completely contained in other keyword
        if (otherKeyword.includes(keyword) && otherKeyword.length > keyword.length) {
          containedIn.push(otherKeyword);
        }
      }
    }

    // If this keyword appears in 2+ other keywords, it's redundant
    if (containedIn.length >= 2) {
      violations.push({
        keyword,
        count: containedIn.length,
        containedIn,
        message: `"${keyword}"는 ${containedIn.length}개 키워드에 포함되어 중복`
      });
    }
  }

  return violations;
}

/**
 * 5. 부분 순서 중복 검사 (Subsequence)
 * 짧은 키워드의 단어들이 긴 키워드에 순서대로 모두 포함되면 중복
 */
function validateSubsequenceOverlap(keywords) {
  const violations = [];

  for (let i = 0; i < keywords.length; i++) {
    for (let j = 0; j < keywords.length; j++) {
      if (i === j) continue;

      const k1Words = keywords[i].split(' ');
      const k2Words = keywords[j].split(' ');

      // Determine shorter and longer
      const shorter = k1Words.length < k2Words.length ? keywords[i] : keywords[j];
      const longer = k1Words.length < k2Words.length ? keywords[j] : keywords[i];
      const shorterWords = shorter.split(' ');
      const longerWords = longer.split(' ');

      if (shorterWords.length === longerWords.length) continue;

      // Check if all words from shorter appear in longer in same order
      let shorterIdx = 0;
      let longerIdx = 0;

      while (shorterIdx < shorterWords.length && longerIdx < longerWords.length) {
        if (shorterWords[shorterIdx] === longerWords[longerIdx]) {
          shorterIdx++;
        }
        longerIdx++;
      }

      // If all words from shorter were found in order, it's a subsequence
      if (shorterIdx === shorterWords.length) {
        // Only add once (avoid duplicate violations)
        const alreadyReported = violations.some(v =>
          (v.shorter === shorter && v.longer === longer) ||
          (v.shorter === longer && v.longer === shorter)
        );

        if (!alreadyReported) {
          violations.push({
            shorter,
            longer,
            message: `"${shorter}"는 "${longer}"에 순서대로 포함되어 검색 의도 중복`
          });
        }
      }
    }
  }

  return violations;
}

/**
 * 6. 불완전한 키워드 검사
 * 조사/부사로 끝나는 불완전한 키워드 차단
 */
function validateIncompleteEndings(keywords) {
  const violations = [];
  const incompleteEndings = ['후', '전', '부터', '까지', '때', '동안', '며'];

  keywords.forEach(keyword => {
    const trimmed = keyword.trim();

    // Check if keyword ends with any incomplete ending
    incompleteEndings.forEach(ending => {
      if (trimmed.endsWith(ending)) {
        violations.push({
          keyword,
          ending,
          message: `"${keyword}"가 "${ending}"로 끝나 불완전함 (뒤에 명사 필요)`
        });
      }
    });
  });

  return violations;
}

/**
 * 7. 타이틀 자연스러움 검사
 * 콜론 뒤 명사 4개 이상 연속 = 부자연스러움
 */
function validateTitleNaturalness(title) {
  const violations = [];

  if (!title.includes(':')) return violations;

  const parts = title.split(':').map(p => p.trim());
  if (parts.length !== 2) return violations;

  const suffix = parts[1];
  // "및", "그리고" 등 접속사 제외하고 단어 수 계산
  const suffixWords = suffix.split(/\s+/).filter(w => w.length > 0 && !['및', '그리고', '또는'].includes(w));

  // 콜론 뒤 4단어 이상 (접속사 제외) = 단어 나열 (부자연스러움)
  if (suffixWords.length >= 5) {
    violations.push({
      title,
      wordCount: suffixWords.length,
      message: `타이틀 콜론 뒤 ${suffixWords.length}단어 → 4단어 이하로 줄이세요`
    });
  }

  // 타이틀 35자 초과 = 너무 김
  if (title.length > 35) {
    violations.push({
      title,
      length: title.length,
      message: `타이틀 ${title.length}자 → 35자 이하로 줄이세요`
    });
  }

  return violations;
}

/**
 * 9. 키워드가 베이스 키워드를 포함하는지 검사
 * 모든 키워드는 핵심 베이스(타이틀 첫 번째 단어)를 포함해야 함
 * 예: "전세보증금 반환 절차: ..." → 베이스 = "전세보증금"
 * 예: "개인파산 면책 절차: ..." → 베이스 = "개인파산" (복합어는 첫 2단어)
 */
function validateBaseKeywordInclusion(title, keywords) {
  const violations = [];

  if (!title.includes(':')) return violations;

  // 타이틀 콜론 앞에서 첫 번째 핵심 단어 추출
  const prefix = title.split(':')[0].trim();
  const prefixWords = prefix.split(/\s+/);

  // 첫 번째 단어가 베이스 (복합명사인 경우 2단어까지)
  // "개인파산 면책" → 둘 다 핵심이므로 2단어
  // "전세보증금 반환" → "전세보증금"만 핵심
  // 판단 기준: 두 번째 단어가 액션/서술어인지 확인
  const actionWords = ['절차', '방법', '계산', '조회', '신청', '확인', '안내', '정리', '가이드', '반환', '청구', '지급', '수령', '처리'];

  let baseKeyword;
  if (prefixWords.length >= 2 && actionWords.includes(prefixWords[1])) {
    // 두 번째가 액션이면 첫 단어만
    baseKeyword = prefixWords[0];
  } else if (prefixWords.length >= 2) {
    // 두 번째도 핵심이면 첫 2단어
    baseKeyword = prefixWords.slice(0, 2).join(' ');
  } else {
    baseKeyword = prefixWords[0];
  }

  keywords.forEach((keyword) => {
    if (!keyword.includes(baseKeyword)) {
      violations.push({
        keyword,
        baseKeyword,
        message: `키워드 "${keyword}"에 베이스 "${baseKeyword}" 없음`
      });
    }
  });

  return violations;
}

/**
 * 10. 타이틀 콜론 앞 단어 수 검사
 * 콜론 앞은 2-4단어여야 함 (베이스 키워드)
 */
function validateTitlePrefixWords(title) {
  const violations = [];

  if (!title.includes(':')) {
    violations.push({
      title,
      message: `타이틀에 콜론(:) 없음 → "베이스 키워드: 서브 키워드" 형식 필요`
    });
    return violations;
  }

  const prefix = title.split(':')[0].trim();
  const prefixWords = prefix.split(/\s+/).filter(w => w.length > 0);

  if (prefixWords.length < 2) {
    violations.push({
      title,
      wordCount: prefixWords.length,
      message: `타이틀 콜론 앞 ${prefixWords.length}단어 → 2단어 이상 필요`
    });
  }

  if (prefixWords.length > 4) {
    violations.push({
      title,
      wordCount: prefixWords.length,
      message: `타이틀 콜론 앞 ${prefixWords.length}단어 → 4단어 이하로 줄이세요`
    });
  }

  return violations;
}

/**
 * 11. 콜론 앞 정확히 3단어 검사 (keyword-extraction.md 규칙)
 */
function validateExact3WordsPrefix(title) {
  const violations = [];
  
  if (!title.includes(':')) return violations;
  
  const prefix = title.split(':')[0].trim();
  const wordCount = prefix.split(/\s+/).filter(w => w.length > 0).length;
  
  if (wordCount !== 3) {
    violations.push({
      title,
      wordCount,
      expected: 3,
      message: `콜론 앞 ${wordCount}단어 → 정확히 3단어 필요 (규칙: [1단어] [2단어] [3단어])`
    });
  }
  
  return violations;
}

/**
 * 12. 1번 키워드 = 콜론 앞 완전 일치 검사
 */
function validateFirstKeywordEqualsPrefix(title, keywords) {
  const violations = [];
  
  if (!title.includes(':') || keywords.length === 0) {
    return violations;
  }
  
  const prefix = title.split(':')[0].trim();
  const firstKeyword = keywords[0].trim();
  
  if (firstKeyword !== prefix) {
    violations.push({
      prefix,
      firstKeyword,
      message: `1번 키워드 "${firstKeyword}" ≠ 콜론 앞 "${prefix}" (완전 일치 필요)`
    });
  }
  
  return violations;
}

/**
 * 13. H2 끝말 패턴 검증 (keyword-extraction.md 규칙)
 */
function validateH2EndingPattern(keywords, h2Array) {
  const violations = [];
  
  const H2_PATTERNS = {
    '절차': '어떻게 되나요?',
    '방법': '어떻게 되나요?',
    '이자': '얼마인가요?',
    '금액': '얼마인가요?',
    '기한': '언제인가요?',
    '시기': '언제인가요?',
    '기준': '무엇인가요?',
    '조건': '무엇인가요?',
    '대상': '누구인가요?',
    '자격': '무엇인가요?',
    '조회': '어떻게 하나요?',
    '확인': '어떻게 하나요?'
  };
  
  keywords.forEach((kw, idx) => {
    if (idx >= h2Array.length) return;
    
    const lastWord = kw.split(/\s+/).pop();
    const expectedPattern = H2_PATTERNS[lastWord];
    const h2 = h2Array[idx];
    
    if (expectedPattern && !h2.endsWith(expectedPattern)) {
      violations.push({
        keyword: kw,
        lastWord,
        expectedPattern,
        actualH2: h2,
        message: `키워드 "${kw}" 끝말 "${lastWord}" → H2는 "${expectedPattern}"로 끝나야 함 (현재: "${h2}")`
      });
    }
  });
  
  return violations;
}

/**
 * 8. 타이틀 단어 반복 검사
 * "X: Y" 형식에서 주요 단어가 양쪽에 모두 등장하면 중복
 */
function validateTitleWordRepetition(title) {
  const violations = [];

  // Split by colon
  if (!title.includes(':')) return violations;

  const parts = title.split(':').map(p => p.trim());
  if (parts.length !== 2) return violations;

  const [prefix, suffix] = parts;

  // Extract meaningful words (excluding common particles)
  const commonParticles = ['및', '와', '과', '의', '은', '는', '이', '가', '을', '를'];

  const prefixWords = prefix.split(/\s+/)
    .filter(w => w.length > 1 && !commonParticles.includes(w));
  const suffixWords = suffix.split(/\s+/)
    .filter(w => w.length > 1 && !commonParticles.includes(w));

  // Find repeated words
  const repeated = prefixWords.filter(w => suffixWords.includes(w));

  if (repeated.length > 0) {
    violations.push({
      title,
      repeated,
      message: `타이틀 "${title}"에서 "${repeated.join(', ')}" 단어가 양쪽에 반복됨`
    });
  }

  return violations;
}

/**
 * YAML 텍스트에서 키워드 추출
 */
function extractKeywordsFromYaml(yamlText) {
  const keywordsMatch = yamlText.match(/keywords:\s*\n((?:\s+-\s+.+\n)+)/);
  if (!keywordsMatch) return null;

  const keywords = keywordsMatch[1]
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^\s*-\s+/, '').trim());

  return keywords;
}

/**
 * YAML 텍스트에서 타이틀 추출
 */
function extractTitleFromYaml(yamlText) {
  const titleMatch = yamlText.match(/title:\s+"([^"]+)"/);
  return titleMatch ? titleMatch[1] : null;
}

/**
 * YAML 텍스트에서 H2 배열 추출
 */
function extractH2FromYaml(yamlText) {
  const h2Match = yamlText.match(/h2:\s*\n((?:\s+-\s+.+\n?)+)/);
  if (!h2Match) return null;
  
  const h2Array = h2Match[1]
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.replace(/^\s*-\s+/, '').trim());
  
  return h2Array;
}

/**
 * 메인 검증 함수
 */
function validateKeywordBlock(yamlText) {
  const title = extractTitleFromYaml(yamlText);
  const keywords = extractKeywordsFromYaml(yamlText);
  const h2Array = extractH2FromYaml(yamlText);

  if (!title || !keywords) {
    return { valid: true, errors: [] };
  }

  const errors = [];

  // 1. 동의어 중복 검사
  const synonymViolations = validateSynonyms(keywords);
  if (synonymViolations.length > 0) {
    errors.push('');
    errors.push('🚫 동의어 중복 발견:');
    synonymViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
      errors.push(`     키워드: "${v.keywords[0]}" + "${v.keywords[1]}"`);
    });
  }

  // 2. 타이틀 일치 검사
  const titleViolations = validateTitleMatch(title, keywords);
  if (titleViolations.length > 0) {
    errors.push('');
    errors.push('🚫 타이틀 불일치 발견:');
    titleViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
      errors.push(`     타이틀: "${title}"`);
    });
  }

  // 3. 의미 중복 검사 (단어 순서만 다름)
  const semanticViolations = validateSemanticDuplication(keywords);
  if (semanticViolations.length > 0) {
    errors.push('');
    errors.push('🚫 의미 중복 발견 (단어 순서):');
    semanticViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 4. 베이스 키워드 중복 검사
  const redundantViolations = validateRedundantBaseKeywords(keywords);
  if (redundantViolations.length > 0) {
    errors.push('');
    errors.push('🚫 베이스 키워드 중복 발견:');
    redundantViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
      v.containedIn.forEach(k => errors.push(`     포함됨: "${k}"`));
    });
  }

  // 5. 부분 순서 중복 검사 (Subsequence)
  const subsequenceViolations = validateSubsequenceOverlap(keywords);
  if (subsequenceViolations.length > 0) {
    errors.push('');
    errors.push('🚫 검색 의도 중복 발견 (순서 포함):');
    subsequenceViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 6. 불완전한 키워드 검사
  const incompleteViolations = validateIncompleteEndings(keywords);
  if (incompleteViolations.length > 0) {
    errors.push('');
    errors.push('🚫 불완전한 키워드 발견:');
    incompleteViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 7. 타이틀 자연스러움 검사
  const naturalnessViolations = validateTitleNaturalness(title);
  if (naturalnessViolations.length > 0) {
    errors.push('');
    errors.push('🚫 타이틀 부자연스러움 발견:');
    naturalnessViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 8. 타이틀 단어 반복 검사
  const titleRepetitionViolations = validateTitleWordRepetition(title);
  if (titleRepetitionViolations.length > 0) {
    errors.push('');
    errors.push('🚫 타이틀 단어 반복 발견:');
    titleRepetitionViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 9. 키워드에 베이스 키워드 포함 검사
  const baseInclusionViolations = validateBaseKeywordInclusion(title, keywords);
  if (baseInclusionViolations.length > 0) {
    errors.push('');
    errors.push('🚫 베이스 키워드 미포함 발견:');
    baseInclusionViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 10. 타이틀 콜론 앞 단어 수 검사
  const prefixViolations = validateTitlePrefixWords(title);
  if (prefixViolations.length > 0) {
    errors.push('');
    errors.push('🚫 타이틀 형식 오류:');
    prefixViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 11. 콜론 앞 정확히 3단어 검사
  const exact3WordsViolations = validateExact3WordsPrefix(title);
  if (exact3WordsViolations.length > 0) {
    errors.push('');
    errors.push('🚫 콜론 앞 단어 수 오류:');
    exact3WordsViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 12. 1번 키워드 = 콜론 앞 완전 일치
  const firstKeywordViolations = validateFirstKeywordEqualsPrefix(title, keywords);
  if (firstKeywordViolations.length > 0) {
    errors.push('');
    errors.push('🚫 1번 키워드 불일치:');
    firstKeywordViolations.forEach(v => {
      errors.push(`  ❌ ${v.message}`);
    });
  }

  // 13. H2 끝말 패턴 검증
  if (h2Array && h2Array.length > 0) {
    const h2PatternViolations = validateH2EndingPattern(keywords, h2Array);
    if (h2PatternViolations.length > 0) {
      errors.push('');
      errors.push('🚫 H2 패턴 오류:');
      h2PatternViolations.forEach(v => {
        errors.push(`  ❌ ${v.message}`);
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    title,
    keywords
  };
}

// CLI 실행
if (require.main === module) {
  const fs = require('fs');
  const input = process.argv[2];

  // stdin 지원 추가
  if (!input && !process.stdin.isTTY) {
    // stdin에서 읽기
    let stdinData = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => {
      stdinData += chunk;
    });
    process.stdin.on('end', () => {
      const result = validateKeywordBlock(stdinData);
      if (result.valid) {
        console.log('✅ 검증 통과!');
        process.exit(0);
      } else {
        console.log('❌ 검증 실패!\n');
        result.errors.forEach(err => console.log(err));
        process.exit(1);
      }
    });
    return;
  }

  if (!input) {
    console.log('사용법: node validate-keywords.js <yaml-file-or-text>');
    console.log('또는: echo "yaml..." | node validate-keywords.js');
    process.exit(1);
  }

  let yamlText;
  if (fs.existsSync(input)) {
    yamlText = fs.readFileSync(input, 'utf8');
  } else {
    yamlText = input;
  }

  const result = validateKeywordBlock(yamlText);

  if (result.valid) {
    console.log('✅ 검증 통과!');
    console.log(`타이틀: ${result.title}`);
    console.log(`키워드: ${result.keywords.length}개`);
    process.exit(0);
  } else {
    console.log('❌ 검증 실패!\n');
    result.errors.forEach(err => console.log(err));
    console.log('');
    console.log('💡 동의어 그룹 참고:');
    console.log('   그룹1: 자격 = 조건 = 요건');
    console.log('   그룹2: 방법 = 절차 = 안내');
    console.log('   그룹11: 비용 = 수임료 = 금액 = 가격');
    process.exit(1);
  }
}

module.exports = {
  validateSynonyms,
  validateTitleMatch,
  validateSemanticDuplication,
  validateRedundantBaseKeywords,
  validateSubsequenceOverlap,
  validateIncompleteEndings,
  validateTitleNaturalness,
  validateTitleWordRepetition,
  validateBaseKeywordInclusion,
  validateTitlePrefixWords,
  validateExact3WordsPrefix,
  validateFirstKeywordEqualsPrefix,
  validateH2EndingPattern,
  validateKeywordBlock,
  extractH2FromYaml,
  SYNONYM_GROUPS
};
