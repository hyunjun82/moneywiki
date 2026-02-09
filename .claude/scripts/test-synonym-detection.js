#!/usr/bin/env node
/**
 * 동의어 검증 테스트 스크립트
 * verify-wiki-quality.js의 강화된 동의어 검증 로직 테스트
 */

const testCases = [
  {
    name: "Spoke #2 위반 (서류 동의어)",
    keywords: ["개인회생 신청방법", "개인회생 관할법원", "개인회생 신청서류", "개인회생 첨부서류"],
    shouldFail: true,
    reason: '"신청서류" ≈ "첨부서류" (서류 그룹)'
  },
  {
    name: "Spoke #3 위반 (비용 동의어)",
    keywords: ["개인회생 예납금", "개인회생 비용", "개인회생 수수료", "개인회생 분할납부"],
    shouldFail: true,
    reason: '"비용" ≈ "수수료" (비용 그룹)'
  },
  {
    name: "Spoke #5 위반 (기간 동의어)",
    keywords: ["개인회생 신청기간", "개인회생 신청기한", "개인회생 취하", "개인회생 준비"],
    shouldFail: true,
    reason: '"신청기간" ≈ "신청기한" (기간 그룹)'
  },
  {
    name: "Spoke #22 위반 (조건 동의어)",
    keywords: ["개인회생 면책조건", "개인회생 면책요건", "개인회생 면책불허", "개인회생 면책효과"],
    shouldFail: true,
    reason: '"면책조건" ≈ "면책요건" (조건 그룹)'
  },
  {
    name: "정상 케이스 (다른 의도)",
    keywords: ["개인회생 신청자격", "개인회생 신청방법", "개인회생 비용", "개인회생 기간"],
    shouldFail: false,
    reason: '모두 다른 검색 의도 (자격, 방법, 비용, 기간)'
  }
];

// 핵심 명사 그룹 (verify-wiki-quality.js와 동일)
const coreNounGroups = [
  ['서류', '문서', '자료', '준비물', '구비서류', '첨부서류', '신청서류', '제출서류'],
  ['비용', '요금', '수수료', '금액', '가격', '비'],
  ['조건', '자격', '요건', '대상', '기준'],
  ['방법', '절차', '과정', '순서', '프로세스'],
  ['기간', '기한', '시기', '시점', '기일', '날짜'],
  ['계산', '산정', '산출', '산식', '계산법'],
  ['지급', '수령', '수급', '받기', '지불'],
  ['감면', '공제', '절세', '혜택'],
  ['종류', '유형', '구분', '타입', '분류'],
];

const prefixWords = new Set(['신청', '접수', '제출', '등록', '변경', '수정', '갱신', '조정', '취소', '철회', '취하', '포기', '개시', '종료', '완료']);

function extractCoreNounGroups(keyword) {
  const words = keyword.split(/\s+/).filter(w => w.length > 1);
  const coreWords = words.slice(-2);

  const foundGroups = new Set();
  coreNounGroups.forEach((group, groupIdx) => {
    for (const noun of group) {
      if (prefixWords.has(noun)) continue;

      for (const coreWord of coreWords) {
        if (coreWord.includes(noun)) {
          foundGroups.add(groupIdx);
        }
      }
    }
  });
  return Array.from(foundGroups);
}

function detectSynonymViolations(keywords) {
  const violations = [];

  for (let i = 0; i < keywords.length; i++) {
    for (let j = i + 1; j < keywords.length; j++) {
      const kw1 = keywords[i].trim();
      const kw2 = keywords[j].trim();

      if (kw1.includes(kw2) || kw2.includes(kw1)) continue;

      const groups1 = extractCoreNounGroups(kw1);
      const groups2 = extractCoreNounGroups(kw2);

      const commonGroups = groups1.filter(g => groups2.includes(g));

      if (commonGroups.length > 0) {
        const duplicatedNouns = [];
        commonGroups.forEach(groupIdx => {
          const group = coreNounGroups[groupIdx];
          const nouns1 = group.filter(n => kw1.includes(n));
          const nouns2 = group.filter(n => kw2.includes(n));
          if (nouns1.length > 0 && nouns2.length > 0) {
            duplicatedNouns.push(`"${nouns1[0]}" ≈ "${nouns2[0]}"`);
          }
        });

        if (duplicatedNouns.length > 0) {
          violations.push({
            kw1,
            kw2,
            reason: duplicatedNouns[0]
          });
        }
      }
    }
  }

  return violations;
}

// 테스트 실행
console.log('');
console.log('╔══════════════════════════════════════════════════════════╗');
console.log('║          🧪 동의어 검증 테스트                           ║');
console.log('╚══════════════════════════════════════════════════════════╝');
console.log('');

let passCount = 0;
let failCount = 0;

testCases.forEach((test, idx) => {
  const violations = detectSynonymViolations(test.keywords);
  const hasViolation = violations.length > 0;

  const passed = (test.shouldFail && hasViolation) || (!test.shouldFail && !hasViolation);

  console.log(`테스트 #${idx + 1}: ${test.name}`);
  console.log(`   키워드: [${test.keywords.join(', ')}]`);
  console.log(`   예상: ${test.reason}`);

  if (hasViolation) {
    console.log(`   결과: ❌ 동의어 위반 발견`);
    violations.forEach(v => {
      console.log(`         "${v.kw1}" ≈ "${v.kw2}" (${v.reason})`);
    });
  } else {
    console.log(`   결과: ✅ 동의어 중복 없음`);
  }

  if (passed) {
    console.log(`   판정: ✅ PASS`);
    passCount++;
  } else {
    console.log(`   판정: ❌ FAIL`);
    failCount++;
  }

  console.log('');
});

console.log('────────────────────────────────────────────────────────────');
console.log(`총 ${testCases.length}개 테스트 | ✅ ${passCount}개 성공 | ❌ ${failCount}개 실패`);
console.log('────────────────────────────────────────────────────────────');
console.log('');

process.exit(failCount > 0 ? 1 : 0);
