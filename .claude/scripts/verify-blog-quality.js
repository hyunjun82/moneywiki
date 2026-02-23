#!/usr/bin/env node
/**
 * 블로그 TSX 품질 검증 스크립트 (v1.0)
 *
 * 대상: src/data/blog/*.tsx (블로그 TSX 파일만)
 *
 * 검증 항목:
 * 1. Import 검증: InlineLink, SpokeLink 포함 여부
 * 2. ResLink + 체커 링크: 체커 결과에 내부링크 포함 여부
 * 3. InlineLink 최소 2개 사용
 * 4. SpokeLink 그룹 최소 1개 (2개 이상 연속)
 * 5. BridgeCard 연속 몰림 방지 (30행 이내 3개 이상)
 */

const fs = require('fs');
const path = require('path');

function validateBlogContent(content, filePath) {
  const errors = [];
  const warnings = [];

  // CRLF -> LF
  content = content.replace(/\r\n/g, '\n');

  // blog TSX 파일만 검증
  const normalizedPath = filePath.replace(/\\/g, '/');
  if (!normalizedPath.includes('src/data/blog/') || !normalizedPath.endsWith('.tsx')) {
    return { valid: true, errors: [], warnings: [], skip: true };
  }

  const lines = content.split('\n');

  // ── 검증 1: Import 검증 ──
  // import 블록에서 InlineLink, SpokeLink 확인
  const importBlock = lines.filter(l => l.includes('import') && l.includes('BlogShared')).join(' ');
  // 여러 줄 import도 처리
  let fullImportBlock = '';
  let inImport = false;
  for (const line of lines) {
    if (line.includes('import') && line.includes('{')) {
      inImport = true;
      fullImportBlock += line;
    } else if (inImport) {
      fullImportBlock += ' ' + line;
      if (line.includes('}') && line.includes('from')) {
        inImport = false;
      }
    }
  }
  // BlogShared import 블록만 필터
  const blogSharedImport = fullImportBlock.includes('BlogShared') ? fullImportBlock : importBlock;

  if (!blogSharedImport.includes('InlineLink')) {
    errors.push('InlineLink 미import — import 블록에 InlineLink 추가 필요');
  }
  if (!blogSharedImport.includes('SpokeLink')) {
    errors.push('SpokeLink 미import — import 블록에 SpokeLink 추가 필요');
  }

  // ── 검증 2: ResLink + 체커 링크 ──
  const hasChecker = content.includes('getResult') || content.includes('체커');
  if (hasChecker) {
    const hasResLink = content.includes('type ResLink') || content.includes('ResLink');
    const hasLinksInRes = content.includes('links:') && (content.includes('ResLink[]') || content.includes('links: ['));

    if (!hasResLink) {
      errors.push('체커 존재하나 ResLink 타입 없음 — type ResLink = { icon: string; title: string; href: string } 추가 필요');
    }
    if (!hasLinksInRes) {
      errors.push('체커 결과에 links 필드 없음 — Res 타입에 links: ResLink[] 추가 + 각 결과에 내부링크 배열 필요');
    }

    // 체커 결과 렌더링에 링크 섹션 확인 (result.links.map 또는 .links.length)
    const hasLinksRendering = content.includes('links.map') || content.includes('links.length');
    if (!hasLinksRendering && hasResLink) {
      errors.push('체커 결과에 링크 렌더링 없음 — result.links.map()으로 내부링크 표시 JSX 추가 필요');
    }
  }

  // ── 검증 3: InlineLink 최소 2개 ──
  const inlineLinkMatches = content.match(/<InlineLink\s/g);
  const inlineLinkCount = inlineLinkMatches ? inlineLinkMatches.length : 0;
  if (inlineLinkCount < 2) {
    errors.push(`InlineLink ${inlineLinkCount}개 — 섹션 사이에 InlineLink 2개 이상 배치 필요`);
  }

  // ── 검증 4: SpokeLink 최소 2개 (그룹으로 사용) ──
  const spokeLinkMatches = content.match(/<SpokeLink\s/g);
  const spokeLinkCount = spokeLinkMatches ? spokeLinkMatches.length : 0;
  if (spokeLinkCount < 2) {
    errors.push(`SpokeLink ${spokeLinkCount}개 — "더 알아보기" SpokeLink 그룹(2개 이상) 추가 필요`);
  }

  // ── 검증 5: FAQAccordion 필수 ──
  if (!content.includes('<FAQAccordion')) {
    errors.push('FAQAccordion 없음 — FAQ 2개 고정 필수 (<FAQAccordion items={[{q:"...", a:"..."}]} /> 추가)');
  }

  // ── 검증 6: 계산형 글 — FormulaCard + CaseBox 권장 ──
  const titleMatch2 = content.match(/title['":\s]+["']([^"']+)["']/);
  const title2 = titleMatch2 ? titleMatch2[1] : '';
  const isCalcType = /계산|얼마|금액|상한액|하한액|세율|공제|수령액/.test(title2);
  if (isCalcType) {
    if (!content.includes('<FormulaCard')) {
      warnings.push('[계산형] FormulaCard 없음 — 핵심 공식 시각화 추가 권장 (<FormulaCard formula="..." />)');
    }
    if (!content.includes('<CaseBox')) {
      warnings.push('[계산형] CaseBox 없음 — 3인 페르소나 계산 예시 추가 권장 (<CaseBox badge="예시 1" ... /> × 3개)');
    }
  }

  // ── 검증 7: 절차형 글 — Steps 권장 ──
  const isProcType = /방법|절차|신청|순서|하는법|발급|등록/.test(title2);
  if (isProcType) {
    if (!content.includes('<Steps')) {
      warnings.push('[절차형] Steps 없음 — 단계별 절차 시각화 추가 권장 (<Steps items={[...]} />)');
    }
  }

  // ── 검증 8: BridgeCard/ExtBtn 연속 몰림 방지 ──
  const ctaPattern = /<(BridgeCard|ExtBtn)\s/;
  const ctaLines = [];
  lines.forEach((line, idx) => {
    if (ctaPattern.test(line)) {
      ctaLines.push(idx);
    }
  });

  // 30행 이내에 3개 이상 몰림 체크
  for (let i = 0; i < ctaLines.length - 2; i++) {
    const span = ctaLines[i + 2] - ctaLines[i];
    if (span <= 30) {
      warnings.push(`BridgeCard/ExtBtn 3개가 ${span}행 이내에 몰려있음 (${ctaLines[i] + 1}행~${ctaLines[i + 2] + 1}행) — 분산 배치 권장`);
      break;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function printResults(result, filePath) {
  if (result.skip) {
    return; // TSX가 아니면 조용히 스킵
  }

  const fileName = path.basename(filePath);

  if (!result.valid || (result.warnings && result.warnings.length > 0)) {
    console.error('');
    console.error('════════════════════════════════════════════════════════════');
    console.error(`📋 블로그 TSX 품질 검증: ${fileName}`);
    console.error('════════════════════════════════════════════════════════════');

    if (result.errors.length > 0) {
      console.error('');
      console.error('❌ [오류] 수정 필수:');
      console.error('');
      for (const err of result.errors) {
        console.error(`   - ${err}`);
      }
    }

    if (result.warnings && result.warnings.length > 0) {
      console.error('');
      console.error('⚠️  [경고] 확인 권장:');
      console.error('');
      for (const warn of result.warnings) {
        console.error(`   - ${warn}`);
      }
    }

    console.error('');
    console.error('────────────────────────────────────────────────────────────');
    console.error('📌 필수 컴포넌트:');
    console.error('   - InlineLink 2개+ (섹션 사이 분산)');
    console.error('   - SpokeLink 그룹 1개+ (2~3개 연속)');
    console.error('   - 체커 결과에 ResLink 내부링크');
    console.error('   - BridgeCard 분산 배치');
    console.error('────────────────────────────────────────────────────────────');
    console.error('');
  }

  if (result.valid) {
    console.log(`✅ 블로그 TSX 품질 검증 통과: ${fileName}`);
  }
}

// ============================================
// 메인 로직: stdin 또는 파일에서 읽기
// ============================================

let inputData = '';
let stdinTimeout = null;

// stdin 읽기 시도 (PreToolUse용)
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  inputData += chunk;
  if (stdinTimeout) clearTimeout(stdinTimeout);
});

process.stdin.on('end', () => {
  if (stdinTimeout) clearTimeout(stdinTimeout);

  if (inputData.trim()) {
    // stdin에서 데이터를 받음 (PreToolUse)
    try {
      const toolInput = JSON.parse(inputData);
      const filePath = toolInput.file_path || toolInput.filePath || '';
      const content = toolInput.content || '';

      const result = validateBlogContent(content, filePath);
      printResults(result, filePath);

      if (!result.valid) {
        process.exit(1);
      }
      process.exit(0);
    } catch (parseError) {
      console.error('⚠️ stdin JSON 파싱 실패');
      process.exit(0);
    }
  } else {
    handlePostToolUse();
  }
});

// 500ms 후에도 stdin 데이터가 없으면 PostToolUse로 처리
stdinTimeout = setTimeout(() => {
  if (!inputData.trim()) {
    process.stdin.destroy();
    handlePostToolUse();
  }
}, 500);

// PostToolUse 처리
function handlePostToolUse() {
  const filePath = process.env.CLAUDE_FILE_PATH || process.argv[2];

  if (!filePath) {
    process.exit(0);
  }

  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    process.exit(0);
  }

  try {
    const content = fs.readFileSync(absolutePath, 'utf8');
    const result = validateBlogContent(content, absolutePath);
    printResults(result, absolutePath);

    if (!result.valid) {
      console.error('');
      console.error('❌ TSX 검증 실패: 오류를 수정해주세요.');
      console.error(`   파일: ${absolutePath}`);
      console.error('');
      process.exit(1);
    }

    process.exit(0);
  } catch (readError) {
    console.error(`⚠️ 파일 읽기 실패: ${readError.message}`);
    process.exit(0);
  }
}

// 전체 타임아웃 (10초)
setTimeout(() => {
  console.error('⚠️ 검증 타임아웃');
  process.exit(0);
}, 10000);
