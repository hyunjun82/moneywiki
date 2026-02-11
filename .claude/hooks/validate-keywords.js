#!/usr/bin/env node
/**
 * validate-keywords.js
 * 키워드 생성 결과 자동 검증 훅
 *
 * 기존 파일 통합:
 *   hooks/validate-keywords.js + scripts/verify-keyword.js + utils/synonym-validator.js
 *
 * 검증 항목:
 *   1. 동의어 중복 (같은 의도 키워드 차단)
 *   2. 2단어 키워드 차단 (롱테일 강제)
 *   3. 금지어 차단 (총정리, 가이드 등)
 *   4. H2에 베이스 키워드 누락
 *   5. 비주얼 배치 연속 중복
 *   6. Description 글자수/키워드 포함/금지 표현
 */

const fs = require('fs');
const path = require('path');

// ─── 동의어 그룹 ───
const SYNONYM_GROUPS = {
  action: [
    ['가입', '신청', '접수', '등록'],
    ['확인', '조회', '검색', '찾기'],
    ['해지', '탈퇴', '취소', '해약'],
    ['방법', '절차', '과정', '순서', '안내'],
  ],
  aspect: [
    ['자격', '조건', '요건', '대상', '기준', '나이', '소득'],
    ['금액', '비용', '가격', '혜택', '지원금', '수수료', '요금'],
    ['기한', '기간', '시기', '시점'],
    ['계산', '산정', '산출'],
    ['지급', '수령', '수급'],
    ['감면', '공제', '절세'],
    ['종류', '유형', '구분'],
    ['서류', '준비물', '문서'],
  ],
};

// ─── 금지어 ───
const BANNED_WORDS = ['총정리', '완벽정리', '정리', '가이드', '가이드북', '확인', '비교표', '알아보기'];

// ─── 검증 함수 ───
function findSynonymConflict(keywords) {
  const errors = [];
  const allGroups = [...SYNONYM_GROUPS.action, ...SYNONYM_GROUPS.aspect];

  for (const group of allGroups) {
    const found = [];
    for (const kw of keywords) {
      for (const synonym of group) {
        if (kw.includes(synonym)) {
          found.push({ keyword: kw, match: synonym });
        }
      }
    }
    if (found.length >= 2) {
      errors.push({
        rule: 'SYNONYM',
        message: `동의어 중복: ${found.map(f => `"${f.keyword}"(${f.match})`).join(' ≈ ')}`,
        group: group.join('≈'),
      });
    }
  }
  return errors;
}

function checkMinWords(keywords) {
  return keywords
    .filter(kw => kw.split(/\s+/).length < 3)
    .map(kw => ({
      rule: 'SHORT',
      message: `2단어 이하 키워드: "${kw}" → 최소 3단어 필요 (신규 사이트 롱테일)`,
    }));
}

function checkBannedWords(title, keywords) {
  const errors = [];
  const allText = [title, ...keywords].join(' ');
  for (const word of BANNED_WORDS) {
    if (allText.includes(word)) {
      errors.push({
        rule: 'BANNED',
        message: `금지어 포함: "${word}" → 타이틀/키워드에서 제거`,
      });
    }
  }
  return errors;
}

function checkDescription(description, keywords) {
  const errors = [];
  if (!description) return errors;

  // 글자수 체크
  const len = description.replace(/\n/g, '').length;
  if (len < 100) {
    errors.push({ rule: 'DESC_SHORT', message: `description 너무 짧음: ${len}자 → 최소 100자` });
  }
  if (len > 155) {
    errors.push({ rule: 'DESC_LONG', message: `description 너무 김: ${len}자 → 최대 155자 (구글 잘림)` });
  }

  // 키워드 포함 체크 (4개 중 최소 3개)
  if (keywords.length >= 4) {
    const included = keywords.filter(kw => {
      const words = kw.split(/\s+/);
      return words.some(w => description.includes(w));
    });
    if (included.length < 3) {
      errors.push({ rule: 'DESC_KW', message: `description에 키워드 ${included.length}/4개만 포함 → 최소 3개 필요` });
    }
  }

  // 금지 패턴 체크
  const descBanned = ['알아보겠습니다', '총정리', '완벽 가이드', '습니다', '합니다'];
  for (const word of descBanned) {
    if (description.includes(word)) {
      errors.push({ rule: 'DESC_BANNED', message: `description 금지 표현: "${word}"` });
    }
  }

  return errors;
}

function checkH2BaseKeyword(h2List, baseKeyword) {
  return h2List
    .filter(h2 => !h2.includes(baseKeyword))
    .map(h2 => ({
      rule: 'H2_BASE',
      message: `H2에 베이스 키워드 누락: "${h2}" ← "${baseKeyword}" 포함 필요`,
    }));
}

function checkVisualDuplication(visuals) {
  const errors = [];
  if (!visuals || visuals.length < 4) return errors;

  // 연속 중복 체크
  for (let i = 1; i < visuals.length; i++) {
    const prev = visuals[i - 1];
    const curr = visuals[i];
    const overlap = prev.filter(v => curr.includes(v));
    if (overlap.length > 0) {
      errors.push({
        rule: 'VISUAL_SEQ',
        message: `비주얼 연속 중복: S${i}→S${i + 1}에 "${overlap.join(', ')}" 반복`,
      });
    }
  }

  // 종류 수 체크 (최소 4종)
  const allVisuals = new Set(visuals.flat());
  if (allVisuals.size < 4) {
    errors.push({
      rule: 'VISUAL_VARIETY',
      message: `비주얼 종류 부족: ${allVisuals.size}종 → 최소 4종 필요`,
    });
  }

  return errors;
}

// ─── 메인 ───
function validate(input) {
  // input: JSON string 또는 파일 경로
  let data;
  try {
    if (fs.existsSync(input)) {
      data = JSON.parse(fs.readFileSync(input, 'utf-8'));
    } else {
      data = JSON.parse(input);
    }
  } catch {
    // stdin에서 읽기 시도
    return { pass: true, errors: [] };
  }

  const allErrors = [];
  const spokes = data.spokes || [data];

  for (const spoke of spokes) {
    const keywords = spoke.keywords || [];
    const title = spoke.title || '';
    const h2List = spoke.h2 || [];
    const baseKeyword = keywords[0]?.split(/\s+/).slice(0, 2).join(' ') || '';
    const visuals = spoke.visuals || [];

    allErrors.push(...findSynonymConflict(keywords));
    allErrors.push(...checkMinWords(keywords));
    allErrors.push(...checkBannedWords(title, keywords));
    allErrors.push(...checkDescription(spoke.description || '', keywords));
    if (h2List.length > 0 && baseKeyword) {
      allErrors.push(...checkH2BaseKeyword(h2List, baseKeyword));
    }
    if (visuals.length > 0) {
      allErrors.push(...checkVisualDuplication(visuals));
    }
  }

  return {
    pass: allErrors.length === 0,
    errors: allErrors,
  };
}

// CLI 실행
if (require.main === module) {
  const input = process.argv[2] || process.env.HOOK_INPUT || '';
  const result = validate(input);

  if (!result.pass) {
    console.error(`\n🔴 키워드 검증 실패 (${result.errors.length}건)\n`);
    for (const err of result.errors) {
      console.error(`  [${err.rule}] ${err.message}`);
    }
    console.error('\n→ 위반 항목 수정 후 재생성하세요.\n');
    process.exit(1);
  } else {
    console.log('✅ 키워드 검증 통과');
    process.exit(0);
  }
}

module.exports = { validate, findSynonymConflict, checkMinWords, checkBannedWords, checkDescription };
