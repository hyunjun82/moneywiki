#!/usr/bin/env node
/**
 * 스포크 TSX 시각화 품질 검증 훅 (v1.0)
 *
 * Write/Edit 훅: src/data/spoke/*.tsx 전용
 *
 * [ERROR] 시각 다양성 3종류+, 연속 사용 금지, SpokeTable ≤2
 * [ERROR] RateCards 전화번호 금지, 섹션 ≥4, intro ≥2문단, quickAnswer 필수
 * [ERROR] FAQ ≥2, sources ≥1, 섹션별 시각 ≥1, 쿠키커터 감지
 * [ERROR] 구어체 위반 (습니다/됩니다)
 * [WARN]  허브 내 시각 조합 중복
 */

const fs = require('fs');
const path = require('path');

function validateSpokeVisuals(content, filePath) {
  const errors = [];
  const warnings = [];

  const normalizedPath = filePath.replace(/\\/g, '/');

  // spoke TSX 파일만 검증
  if (!normalizedPath.includes('src/data/spoke/') || !normalizedPath.endsWith('.tsx')) {
    return { valid: true, skip: true };
  }
  if (/\/(registry|types)\.ts/.test(normalizedPath)) {
    return { valid: true, skip: true };
  }

  content = content.replace(/\r\n/g, '\n');

  // ===== 시각 요소 순서 추출 =====
  const visualSequence = [];
  const visualRegex = /<(SpokeTable|RateCards|FormulaBox|TipBox|SpokeTimeline|SpokeStepCards|SpokeCompareCards|SpokeRateBars|SpokeFlow|SpokeWarnBox|SpokeChecklist)\b/g;
  let m;
  while ((m = visualRegex.exec(content)) !== null) {
    visualSequence.push(m[1]);
  }

  // ===== 1. 시각 요소 다양성 (4종류+) =====
  const uniqueTypes = new Set(visualSequence);
  if (uniqueTypes.size < 4) {
    errors.push(`시각 다양성 부족: [${Array.from(uniqueTypes).join(', ')}] (${uniqueTypes.size}종류) → 최소 4종류 필요 (11개 중 선택)`);
  }

  // ===== 2. 같은 컴포넌트 연속 사용 금지 =====
  for (let i = 1; i < visualSequence.length; i++) {
    if (visualSequence[i] === visualSequence[i - 1]) {
      errors.push(`연속 사용 금지: ${visualSequence[i]} (${i}→${i + 1}번째) → 다른 컴포넌트로 교차`);
    }
  }

  // ===== 3. SpokeTable ≤ 2 =====
  const tableCount = visualSequence.filter(v => v === 'SpokeTable').length;
  if (tableCount > 2) {
    errors.push(`SpokeTable ${tableCount}개 → 최대 2개, 나머지는 텍스트로`);
  }

  // ===== 4. RateCards 전화번호 검증 =====
  // 인라인 RateCards
  const phonePattern = /^\d{3,4}$|^1\d{3}-\d{3,4}$|^1\d{2,3}$/;

  // 모든 value: 속성 중 RateCards 근처의 것 찾기
  // 방법: RateCards cards={[ ... ]} 블록 추출
  const rateCardsBlockRegex = /<RateCards\s+cards=\{(\[[\s\S]*?\])\}\s*\/>/g;
  let rcMatch;
  while ((rcMatch = rateCardsBlockRegex.exec(content)) !== null) {
    const block = rcMatch[1];
    const valueMatches = block.match(/value:\s*['"]([^'"]+)['"]/g) || [];
    for (const vm of valueMatches) {
      const val = vm.match(/value:\s*['"]([^'"]+)['"]/)[1];
      if (phonePattern.test(val)) {
        errors.push(`RateCards 전화번호 금지: value="${val}" → 비율(%)/금액(원)/기간 등으로`);
      }
    }
  }

  // 변수 참조 RateCards: <RateCards cards={VAR_NAME} />
  const varRefRegex = /<RateCards\s+cards=\{([A-Z_][A-Z0-9_]*)\}\s*\/>/g;
  let vrMatch;
  while ((vrMatch = varRefRegex.exec(content)) !== null) {
    const varName = vrMatch[1];
    const varDefRegex = new RegExp(`const\\s+${varName}\\s*[=:]\\s*\\[([\\s\\S]*?)\\]`);
    const varDef = content.match(varDefRegex);
    if (varDef) {
      const varValues = varDef[1].match(/value:\s*['"]([^'"]+)['"]/g) || [];
      for (const vm of varValues) {
        const val = vm.match(/value:\s*['"]([^'"]+)['"]/)[1];
        if (phonePattern.test(val)) {
          errors.push(`RateCards(${varName}) 전화번호 금지: value="${val}"`);
        }
      }
    }
  }

  // ===== 5. 섹션 수 ≥ 4 =====
  const sectionNumbers = content.match(/number:\s*['"]\d{2}['"]/g) || [];
  const sectionCount = sectionNumbers.length;
  if (sectionCount < 4) {
    errors.push(`섹션 ${sectionCount}개 → 최소 4개 필요`);
  }

  // ===== 6. hero.intro ≥ 2문단 (<p> 태그 기준) =====
  // hubCTA 경계로 intro 블록 추출 (JSX 내부 괄호 오매칭 방지)
  const introBlock = content.match(/intro:\s*\(([\s\S]*?)\)\s*,\s*\n\s*hubCTA:/);
  if (introBlock) {
    const introContent = introBlock[1];
    const pCount = (introContent.match(/<p[\s>]/g) || []).length;
    if (pCount < 2) {
      errors.push(`hero.intro ${pCount}문단 → 최소 2문단 (<p> 태그 2개 이상)`);
    }
  }

  // ===== 6-B. quickAnswer 존재 검증 =====
  const hasQuickAnswer = /quickAnswer:\s*\{/.test(content);
  if (!hasQuickAnswer) {
    errors.push('quickAnswer 없음 → hero에 quickAnswer(title, body, hook) 필수');
  }

  // ===== 7. FAQ ≥ 2 =====
  // faq 배열 내의 question만 카운트
  const faqBlock = content.match(/faq:\s*\[([\s\S]*?)\]\s*,?\s*\n\s*(related|sources)/);
  if (faqBlock) {
    const faqQuestions = faqBlock[1].match(/question:\s*['"][^'"]+['"]/g) || [];
    if (faqQuestions.length < 2) {
      errors.push(`FAQ ${faqQuestions.length}개 → 최소 2개 필요`);
    }
  } else {
    // fallback: 전체에서 검색
    const faqAll = content.match(/question:\s*['"][^'"]+['"]/g) || [];
    if (faqAll.length < 2) {
      errors.push(`FAQ ${faqAll.length}개 → 최소 2개 필요`);
    }
  }

  // ===== 8. sources ≥ 1 =====
  const sourceItems = content.match(/{\s*name:\s*['"][^'"]+['"],\s*url:\s*['"][^'"]+['"]/g) || [];
  if (sourceItems.length < 1) {
    errors.push('sources 없음 → 최소 1개 필요');
  }

  // ===== 9. 섹션별 시각 요소 ≥ 1 + 10. 쿠키커터 감지 =====
  // 위치 기반 섹션 경계 계산 (faq/sources 오염 방지)
  if (sectionCount >= 4) {
    const numPositions = [];
    const numPosRegex = /number:\s*['"]\d{2}['"]/g;
    let np;
    while ((np = numPosRegex.exec(content)) !== null) {
      numPositions.push(np.index);
    }

    // sections 배열 끝 찾기: 마지막 섹션 이후 첫 번째 "],\n" 또는 "faq:"
    const lastSectionPos = numPositions[numPositions.length - 1];
    const faqPos = content.indexOf('faq:', lastSectionPos);
    const sectionsEndPos = faqPos > 0 ? faqPos : content.length;

    const cookiePatterns = [];

    for (let i = 0; i < numPositions.length; i++) {
      const start = numPositions[i];
      const end = i + 1 < numPositions.length ? numPositions[i + 1] : sectionsEndPos;
      const sectionContent = content.substring(start, end);

      const sNum = sectionNumbers[i]
        ? sectionNumbers[i].match(/['"](\d{2})['"]/)[1]
        : String(i + 1).padStart(2, '0');

      // content: null 섹션 (FAQ 자리표시) 스킵
      if (/content:\s*null/.test(sectionContent)) {
        cookiePatterns.push('FAQ');
        continue;
      }

      // 섹션별 시각 요소 체크
      const sectionVisuals = [];
      const svReg = /<(SpokeTable|RateCards|FormulaBox|TipBox|SpokeTimeline|SpokeStepCards|SpokeCompareCards|SpokeRateBars|SpokeFlow|SpokeWarnBox|SpokeChecklist)\b/g;
      let sv;
      while ((sv = svReg.exec(sectionContent)) !== null) {
        sectionVisuals.push(sv[1]);
      }

      if (sectionVisuals.length === 0) {
        errors.push(`섹션 ${sNum}: 시각 요소 없음 → 11개 컴포넌트 중 최소 1개 사용`);
      }

      cookiePatterns.push(sectionVisuals.join('+'));
    }

    // 쿠키커터 패턴 감지
    const nonEmpty = cookiePatterns.filter(p => p.length > 0);
    const uniquePatterns = new Set(nonEmpty);
    if (uniquePatterns.size === 1 && nonEmpty.length >= 3) {
      errors.push(`쿠키커터 패턴: 모든 섹션이 [${nonEmpty[0]}] 동일 → 섹션마다 다른 시각 조합 필요`);
    }
  }

  // ===== 11. AI 패턴 감지 =====

  // 11-A. TipBox 과다 (40% 이상이면 AI 찍어낸 느낌)
  const tipBoxCount = visualSequence.filter(v => v === 'TipBox').length;
  if (visualSequence.length >= 5) {
    const tipBoxRatio = tipBoxCount / visualSequence.length;
    if (tipBoxRatio > 0.4 && tipBoxCount >= 3) {
      errors.push(`TipBox 과다: ${tipBoxCount}/${visualSequence.length}개 (${Math.round(tipBoxRatio * 100)}%) → 40% 이하로 줄이기`);
    }
  }

  // 11-B. 섹션마다 TipBox로 끝남 (AI 패턴)
  if (sectionCount >= 4) {
    const sectionParts2 = content.split(/number:\s*['"]\d{2}['"]/);
    let tipBoxEndCount = 0;
    let contentSectionCount = 0;
    for (let i = 1; i < sectionParts2.length; i++) {
      const part = sectionParts2[i];
      if (/content:\s*null/.test(part)) continue;
      contentSectionCount++;
      // 마지막 시각 요소 찾기
      const visuals = [];
      const lastVReg = /<(SpokeTable|RateCards|FormulaBox|TipBox|SpokeTimeline|SpokeStepCards|SpokeCompareCards|SpokeRateBars|SpokeFlow|SpokeWarnBox|SpokeChecklist)\b/g;
      let lv;
      while ((lv = lastVReg.exec(part)) !== null) {
        visuals.push(lv[1]);
      }
      if (visuals.length > 0 && visuals[visuals.length - 1] === 'TipBox') {
        tipBoxEndCount++;
      }
    }
    if (tipBoxEndCount >= 3 && tipBoxEndCount === contentSectionCount) {
      errors.push(`AI 패턴: ${tipBoxEndCount}개 섹션 전부 TipBox로 끝남 → 다양한 마무리 필요 (FormulaBox/SpokeTable 등)`);
    } else if (tipBoxEndCount >= 3) {
      warnings.push(`TipBox 끝 패턴: ${tipBoxEndCount}/${contentSectionCount}개 섹션이 TipBox로 끝남`);
    }
  }

  // 11-C. 첫 시각 요소 동일 (같은 허브 내)
  // → 12번 크로스체크에서 함께 처리

  // ===== 12. 구어체 위반 (ERROR) =====
  // 주석/import 제외
  const bodyContent = content
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^import\s+.*$/gm, '');
  const formalMatches = bodyContent.match(/[가-힣]+(습니다|됩니다)/g);
  if (formalMatches && formalMatches.length > 0) {
    errors.push(`구어체 위반 ${formalMatches.length}건: "${formalMatches.slice(0, 3).join('", "')}" → ~이에요/~해요`);
  }

  // ===== 13. 같은 허브 내 크로스 체크 =====
  try {
    const hubMatch = content.match(/hub:\s*{\s*url:\s*['"]([^'"]+)['"]/);
    if (hubMatch && visualSequence.length > 0) {
      const hubUrl = hubMatch[1];
      const spokeDir = path.dirname(path.resolve(filePath));
      const currentFile = path.basename(filePath);

      const siblings = fs.readdirSync(spokeDir).filter(f =>
        f.endsWith('.tsx') && f !== currentFile && !['registry.ts', 'types.ts'].includes(f)
      );

      const sibFirstVisuals = [];
      const currentFirst = visualSequence[0];

      for (const sib of siblings) {
        try {
          const sibContent = fs.readFileSync(path.join(spokeDir, sib), 'utf8');
          const sibHub = sibContent.match(/hub:\s*{\s*url:\s*['"]([^'"]+)['"]/);
          if (sibHub && sibHub[1] === hubUrl) {
            const sibVisuals = [];
            const svReg2 = /<(SpokeTable|RateCards|FormulaBox|TipBox|SpokeTimeline|SpokeStepCards|SpokeCompareCards|SpokeRateBars|SpokeFlow|SpokeWarnBox|SpokeChecklist)\b/g;
            let sv2;
            while ((sv2 = svReg2.exec(sibContent)) !== null) {
              sibVisuals.push(sv2[1]);
            }

            // 13-A. 완전 동일 패턴
            if (JSON.stringify(visualSequence) === JSON.stringify(sibVisuals)) {
              errors.push(`시각 조합 완전 중복: "${sib}"과 동일 패턴 → 시각 요소 순서/종류 변경`);
            }

            // 13-B. 시각 시그니처 유사도 (종류별 개수 비교)
            const currentSig = {};
            visualSequence.forEach(v => { currentSig[v] = (currentSig[v] || 0) + 1; });
            const sibSig = {};
            sibVisuals.forEach(v => { sibSig[v] = (sibSig[v] || 0) + 1; });
            if (JSON.stringify(currentSig) === JSON.stringify(sibSig) && sibVisuals.length > 0) {
              warnings.push(`시각 비율 동일: "${sib}"과 컴포넌트 개수 동일 → 비율 다르게`);
            }

            // 13-C. 첫 시각 요소 수집
            if (sibVisuals.length > 0) {
              sibFirstVisuals.push(sibVisuals[0]);
            }
          }
        } catch (e) { /* skip */ }
      }

      // 13-D. 같은 허브 내 첫 시각 요소 집중도
      if (sibFirstVisuals.length >= 2) {
        const sameFirstCount = sibFirstVisuals.filter(v => v === currentFirst).length;
        if (sameFirstCount === sibFirstVisuals.length) {
          warnings.push(`첫 시각 요소 집중: 같은 허브 ${sameFirstCount + 1}개 스포크 모두 ${currentFirst}로 시작 → 다양하게`);
        }
      }
    }
  } catch (e) { /* cross-check 실패 무시 */ }

  return { valid: errors.length === 0, errors, warnings };
}

// === 결과 출력 ===
function printResults(result, filePath) {
  if (result.skip) {
    console.log('✅ 스킵 (spoke TSX 아님)');
    return;
  }

  if (!result.valid || result.warnings.length > 0) {
    console.error('');
    console.error('╔══════════════════════════════════════════════════════════╗');
    console.error('║          🎨 스포크 시각화 품질 검증                        ║');
    console.error('╚══════════════════════════════════════════════════════════╝');
    console.error(`📁 ${filePath}`);
    console.error('');

    if (result.errors.length > 0) {
      console.error('❌ [시각화 오류] 수정 필수:');
      console.error('');
      result.errors.forEach(e => console.error(`   ${e}`));
      console.error('');
    }

    if (result.warnings.length > 0) {
      console.error('⚠️  [경고] 확인 권장:');
      console.error('');
      result.warnings.forEach(w => console.error(`   ${w}`));
      console.error('');
    }

    console.error('────────────────────────────────────────────────────────────');
    console.error('📌 규칙 요약:');
    console.error('   시각 4종류+ | 연속 금지 | SpokeTable ≤2 | 전화번호 금지');
    console.error('   섹션 4+ | intro 2문단+ | quickAnswer 필수 | FAQ 2+ | sources 1+');
    console.error('   컴포넌트 11개: Table/RateCards/FormulaBox/TipBox/Timeline/');
    console.error('   StepCards/CompareCards/RateBars/Flow/WarnBox/Checklist');
    console.error('────────────────────────────────────────────────────────────');
    console.error('');
  }

  if (result.valid) {
    const warnMsg = result.warnings.length > 0 ? ` (경고 ${result.warnings.length}건)` : '';
    console.log(`✅ 스포크 시각화 검증 통과${warnMsg}`);
  }
}

// === I/O: PreToolUse(stdin) / PostToolUse(file) ===
let inputData = '';
let stdinTimeout = null;

process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => {
  inputData += chunk;
  if (stdinTimeout) clearTimeout(stdinTimeout);
});

process.stdin.on('end', () => {
  if (stdinTimeout) clearTimeout(stdinTimeout);
  if (inputData.trim()) {
    try {
      const toolInput = JSON.parse(inputData);
      const filePath = toolInput.file_path || toolInput.filePath || '';
      const content = toolInput.content || '';
      const result = validateSpokeVisuals(content, filePath);
      printResults(result, filePath);
      process.exit(result.valid ? 0 : 1);
    } catch (e) {
      process.exit(0);
    }
  } else {
    handlePostToolUse();
  }
});

stdinTimeout = setTimeout(() => {
  if (!inputData.trim()) {
    process.stdin.destroy();
    handlePostToolUse();
  }
}, 500);

function handlePostToolUse() {
  const filePath = process.env.CLAUDE_FILE_PATH || process.argv[2];
  if (!filePath) { process.exit(0); return; }

  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) { process.exit(0); return; }

  try {
    const content = fs.readFileSync(absPath, 'utf8');
    const result = validateSpokeVisuals(content, absPath);
    printResults(result, absPath);
    process.exit(result.valid ? 0 : 1);
  } catch (e) {
    console.error(`⚠️ 파일 읽기 실패: ${e.message}`);
    process.exit(0);
  }
}

setTimeout(() => { process.exit(0); }, 10000);
