#!/usr/bin/env node
/**
 * 블로그 TSX 품질 검증 스크립트 (v2.0 — 골든 스탠다드)
 *
 * 대상: src/data/blog/*.tsx (블로그 TSX 파일만)
 *
 * ── v1.x 검증 항목 ──
 * 1.  Import: InlineLink, SpokeLink
 * 2.  ResLink + 체커 내부링크
 * 3.  InlineLink ≥ 2개
 * 4.  SpokeLink ≥ 2개
 * 5.  FAQAccordion 필수
 * 6.  [계산형] FormulaCard + CaseBox
 * 7.  [절차형] Steps
 * 8.  BridgeCard/ExtBtn 연속 몰림 방지
 * 9.  Sec sub= ≥ 1개
 * 10. Info type="warn" ≥ 1개
 * 11. SpokeLink num= ≥ 1개
 * 12. InlineLink desc= ≥ 1개
 * 13. Btn ≥ 5개
 * 14. title 구조 (파이프, 3단어, 동의어, 금지어, 60자)
 * 15. description 금지어/길이
 *
 * ── v2.0 추가 (골든 스탠다드 필수) ──
 * 16. TOC 필수
 * 17. Summary3 필수
 * 18. RelatedMid 필수 (본문 중간 관련 카드)
 * 19. RelatedArticles 필수
 * 20. PrevNext 필수
 * 21. BlogLayout sidebar= 필수
 * 22. SidebarCTA 필수
 * 23. SidebarDocs 필수
 * 24. SidebarCalc 필수
 * 25. CheckerShell 필수
 * 26. Sec 개수 5~7 (표준 6)
 * 27. Divider 개수 ≥ 4
 * 28. disclaimer= prop 권장
 * 29. sourceBar= prop 권장
 * 30. meta 객체 keywords 4개
 * 31. meta.faq 2개
 * 32. meta.sources ≥ 1개
 * 33. meta.ctaCard 필수
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

  // ── Import 블록 추출 ──
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
  const blogSharedImport = fullImportBlock.includes('BlogShared') ? fullImportBlock : '';

  // ══════════════════════════════════════════
  // A. 컴포넌트 사용 검증 (v1.x)
  // ══════════════════════════════════════════

  // 1. Import 검증
  if (!blogSharedImport.includes('InlineLink')) {
    errors.push('[import] InlineLink 미import');
  }
  if (!blogSharedImport.includes('SpokeLink')) {
    errors.push('[import] SpokeLink 미import');
  }

  // 2. ResLink + 체커 링크
  const hasChecker = content.includes('getResult') || content.includes('CheckerShell');
  if (hasChecker) {
    const hasResLink = content.includes('type ResLink') || content.includes('ResLink');
    const hasLinksInRes = content.includes('links:') && (content.includes('ResLink[]') || content.includes('links: ['));
    if (!hasResLink) errors.push('[체커] ResLink 타입 정의 없음');
    if (!hasLinksInRes) errors.push('[체커] 결과에 links 필드 없음 — 내부링크 배열 필요');
    const hasLinksRendering = content.includes('links.map') || content.includes('links.length');
    if (!hasLinksRendering && hasResLink) errors.push('[체커] 링크 렌더링(links.map) 없음');
  }

  // 3. InlineLink ≥ 2개
  const inlineLinkCount = (content.match(/<InlineLink\s/g) || []).length;
  if (inlineLinkCount < 2) {
    errors.push(`[InlineLink] ${inlineLinkCount}개 — 2개 이상 필수 (섹션 사이 분산)`);
  }

  // 4. SpokeLink ≥ 2개
  const spokeLinkCount = (content.match(/<SpokeLink\s/g) || []).length;
  if (spokeLinkCount < 2) {
    errors.push(`[SpokeLink] ${spokeLinkCount}개 — 2개 이상 필수`);
  }

  // 5. FAQAccordion 필수
  if (!content.includes('<FAQAccordion')) {
    errors.push('[FAQ] FAQAccordion 없음');
  }

  // 6. 계산형 — FormulaCard + CaseBox
  const titleMatch2 = content.match(/title['":\s]+["']([^"']+)["']/);
  const titleText = titleMatch2 ? titleMatch2[1] : '';
  const isCalcType = /계산|얼마|금액|상한액|하한액|세율|공제|수령액/.test(titleText);
  if (isCalcType) {
    if (!content.includes('<FormulaCard')) errors.push('[계산형] FormulaCard 없음');
    if (!content.includes('<CaseBox')) errors.push('[계산형] CaseBox 없음 — 3인 예시 필수');
  }

  // 7. 절차형 — Steps
  const isProcType = /방법|절차|신청|순서|하는법|발급|등록/.test(titleText);
  if (isProcType) {
    if (!content.includes('<Steps')) errors.push('[절차형] Steps 없음');
  }

  // 8. BridgeCard/ExtBtn 연속 몰림
  const ctaPattern = /<(BridgeCard|ExtBtn)\s/;
  const ctaLines = [];
  lines.forEach((line, idx) => {
    if (ctaPattern.test(line)) ctaLines.push(idx);
  });
  for (let i = 0; i < ctaLines.length - 2; i++) {
    if (ctaLines[i + 2] - ctaLines[i] <= 30) {
      warnings.push(`[배치] BridgeCard/ExtBtn 3개 몰림 (${ctaLines[i] + 1}~${ctaLines[i + 2] + 1}행)`);
      break;
    }
  }

  // 9. Sec sub= ≥ 1개
  if ((content.match(/<Sec\s[^>]*sub=/g) || []).length < 1) {
    errors.push('[Sec] sub= 없음 — 최소 1개 부제목 필수');
  }

  // 10. Info type="warn" ≥ 1개
  if (!content.includes('type="warn"')) {
    errors.push('[Info] type="warn" 없음 — 경고 박스 최소 1개 필수');
  }

  // 11. SpokeLink num=
  if (content.includes('<SpokeLink') && !(content.match(/<SpokeLink\s[^>]*num=/g) || []).length) {
    errors.push('[SpokeLink] num= 없음 — 최소 1개에 num="01" 필수');
  }

  // 12. InlineLink desc=
  if (content.includes('<InlineLink') && !(content.match(/<InlineLink\s[^>]*desc=/g) || []).length) {
    errors.push('[InlineLink] desc= 없음 — 최소 1개에 desc="설명" 필수');
  }

  // 13. Btn ≥ 5개
  const btnCount = (content.match(/<Btn\s/g) || []).length;
  const checkerQCount = (content.match(/<CheckerQ\s/g) || []).length;
  // CheckerQ 사용 시 Btn은 내부 렌더링이므로, opts 배열 길이를 대략 카운트
  if (checkerQCount === 0 && btnCount < 5) {
    errors.push(`[체커] Btn ${btnCount}개 — 최소 5개 필수 (Q1 3개 + Q2 2개)`);
  }

  // ══════════════════════════════════════════
  // B. 골든 스탠다드 구조 검증 (v2.0)
  // ══════════════════════════════════════════

  // 16. TOC 필수
  if (!content.includes('<TOC')) {
    errors.push('[구조] TOC 없음 — 목차 컴포넌트 필수');
  }

  // 17. Summary3 필수
  if (!content.includes('<Summary3')) {
    errors.push('[구조] Summary3 없음 — 3줄 요약 필수');
  }

  // 18. RelatedMid 필수
  if (!content.includes('<RelatedMid')) {
    errors.push('[구조] RelatedMid 없음 — 본문 중간 관련 카드 섹션 필수 (SECTION 03-04 사이)');
  }

  // 19. RelatedArticles 필수
  if (!content.includes('<RelatedArticles')) {
    errors.push('[구조] RelatedArticles 없음 — 하단 관련 글 섹션 필수');
  }

  // 20. PrevNext 필수
  if (!content.includes('<PrevNext')) {
    errors.push('[구조] PrevNext 없음 — 이전/다음 글 네비게이션 필수');
  }

  // 21. BlogLayout sidebar= 필수
  if (content.includes('<BlogLayout') && !content.includes('sidebar=')) {
    errors.push('[레이아웃] sidebar= prop 없음 — 2컬럼 사이드바 필수');
  }

  // 22. SidebarCTA 필수
  if (!content.includes('<SidebarCTA') && !content.includes('SidebarCTA')) {
    errors.push('[사이드바] SidebarCTA 없음 — CTA 카드 필수');
  }

  // 23. SidebarDocs 필수
  if (!content.includes('<SidebarDocs') && !content.includes('SidebarDocs')) {
    errors.push('[사이드바] SidebarDocs 없음 — 관련 문서 필수');
  }

  // 24. SidebarCalc 필수
  if (!content.includes('<SidebarCalc') && !content.includes('SidebarCalc')) {
    errors.push('[사이드바] SidebarCalc 없음 — 인기 계산기 필수');
  }

  // 25. CheckerShell 필수
  if (!content.includes('<CheckerShell') && !content.includes('CheckerShell')) {
    errors.push('[체커] CheckerShell 없음 — 자격 체크 카드 필수');
  }

  // 26. Sec 개수 5~7
  const secCount = (content.match(/<Sec\s/g) || []).length;
  if (secCount < 5) {
    errors.push(`[구조] Sec ${secCount}개 — 최소 5개 필수 (체커+키워드H2 4개+FAQ = 6개 표준)`);
  } else if (secCount > 7) {
    warnings.push(`[구조] Sec ${secCount}개 — 7개 초과, 글 분리 검토`);
  }

  // 27. Divider ≥ 4개
  const dividerCount = (content.match(/<Divider\s*\/?\s*>/g) || []).length;
  if (dividerCount < 4) {
    warnings.push(`[구조] Divider ${dividerCount}개 — 섹션 구분선 4개 이상 권장`);
  }

  // 28. disclaimer 권장
  if (content.includes('<BlogLayout') && !content.includes('disclaimer=') && !content.includes('disclaimer={')) {
    warnings.push('[레이아웃] disclaimer= 없음 — 맞춤 면책 문구 권장');
  }

  // 29. sourceBar 권장
  if (content.includes('<BlogLayout') && !content.includes('sourceBar=') && !content.includes('sourceBar={')) {
    warnings.push('[레이아웃] sourceBar= 없음 — 출처 바 권장');
  }

  // ══════════════════════════════════════════
  // C. meta 객체 검증 (v2.0)
  // ══════════════════════════════════════════

  // 30. keywords 4개
  const kwMatch = content.match(/keywords:\s*\[([^\]]+)\]/);
  if (kwMatch) {
    const kwCount = (kwMatch[1].match(/["'][^"']+["']/g) || []).length;
    if (kwCount !== 4) {
      errors.push(`[meta] keywords ${kwCount}개 — 정확히 4개 필수`);
    }
  } else {
    errors.push('[meta] keywords 배열 없음');
  }

  // 31. faq 2개
  const faqMatch = content.match(/faq:\s*\[([\s\S]*?)\],?\s*\n\s*(ctaCard|relatedDocs|};)/);
  if (faqMatch) {
    const faqQCount = (faqMatch[1].match(/q:\s*["']/g) || []).length;
    if (faqQCount < 2) {
      errors.push(`[meta] faq ${faqQCount}개 — 2개 필수`);
    }
  } else {
    // faq가 없을 수 있으므로 다른 패턴도 체크
    const faqAlt = content.match(/faq:\s*\[/);
    if (!faqAlt) {
      errors.push('[meta] faq 배열 없음');
    }
  }

  // 32. sources ≥ 1개
  const srcMatch = content.match(/sources:\s*\[/);
  if (!srcMatch) {
    errors.push('[meta] sources 배열 없음 — 출처 최소 1개 필수');
  }

  // 33. ctaCard 필수
  if (!content.includes('ctaCard:') && !content.includes('ctaCard =')) {
    errors.push('[meta] ctaCard 없음');
  }

  // ══════════════════════════════════════════
  // D. title/description 검증 (v1.2)
  // ══════════════════════════════════════════

  // 14. title 구조
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  if (titleMatch) {
    const title = titleMatch[1];

    if (!title.includes('|')) {
      errors.push('[title] 파이프(|) 없음 — "메인 롱테일 | 연관 롱테일" 형식 필수');
    } else {
      const parts = title.split('|');
      const left = parts[0].trim();
      const right = parts[1].trim();
      const leftWords = left.split(/\s+/).filter(Boolean);
      const rightWords = right.split(/\s+/).filter(Boolean);

      if (leftWords.length < 3) errors.push(`[title] 파이프 전 ${leftWords.length}단어 — 최소 3단어`);
      if (rightWords.length < 3) errors.push(`[title] 파이프 후 ${rightWords.length}단어 — 최소 3단어`);

      // 베이스 키워드 반복
      if (leftWords.length > 0) {
        const baseKw = leftWords[0];
        if (rightWords.some(w => w === baseKw)) {
          errors.push(`[title] 베이스 "${baseKw}" 양쪽 반복`);
        }
      }

      // 동의어 중복
      const synonymGroups = [
        ['조건', '자격', '요건', '대상', '기준', '한도'],
        ['방법', '절차', '하는법'],
        ['금액', '비용', '얼마'],
        ['가입', '신청', '등록'],
        ['계산', '산정', '산출'],
      ];
      const allTitleWords = [...leftWords, ...rightWords];
      for (const group of synonymGroups) {
        const found = group.filter(syn => allTitleWords.some(w => w.includes(syn)));
        if (found.length >= 2) {
          errors.push(`[title] 동의어 중복: "${found.join('" "')}" — 1개만`);
        }
      }

      // 금지어
      for (const f of ['총정리', '완벽정리', '가이드']) {
        if (title.includes(f)) errors.push(`[title] 금지어 "${f}"`);
      }
      if (title.includes(':')) errors.push('[title] 콜론(:) 금지');
      if (title.includes('—')) errors.push('[title] 긴대시(—) 금지');
      if (title.includes(' 및 ')) errors.push('[title] "및" → 자연 검색어로');

      if (title.length > 60) errors.push(`[title] ${title.length}자 → 60자 이내`);

      if (/[?？나요]$/.test(right)) errors.push('[title] 파이프 후 질문형 금지');
      if (/(해요|봐요|됩니다|합니다|드려요|알아봐요)$/.test(right)) errors.push('[title] 파이프 후 설명문 금지');
    }
  }

  // 15. description 금지어/길이
  const descMatch = content.match(/description:\s*["']([^"']+)["']/);
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.includes('확인하세요')) errors.push('[description] "확인하세요" 금지');
    if (desc.includes('알아봅니다')) errors.push('[description] "알아봅니다" 금지');
    if (desc.includes('총정리')) errors.push('[description] "총정리" 금지');
    if (desc.length < 100) warnings.push(`[description] ${desc.length}자 → 100자 이상 권장`);
    if (desc.length > 150) warnings.push(`[description] ${desc.length}자 → 150자 이하 권장`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function printResults(result, filePath) {
  if (result.skip) return;

  const fileName = path.basename(filePath);

  if (!result.valid || (result.warnings && result.warnings.length > 0)) {
    console.error('');
    console.error('════════════════════════════════════════════════════════════');
    console.error(`📋 블로그 TSX 품질 검증 v2.0: ${fileName}`);
    console.error('════════════════════════════════════════════════════════════');

    if (result.errors.length > 0) {
      console.error('');
      console.error('🚨🚨🚨 STOP — 아래 오류를 먼저 수정하세요. registry 추가·git 작업 절대 금지! 🚨🚨🚨');
      console.error('');
      console.error(`❌ [오류] ${result.errors.length}건 수정 필수:`);
      console.error('');
      for (const err of result.errors) {
        console.error(`   ✗ ${err}`);
      }
      console.error('');
      console.error('👉 오류 수정 후 재검증: node .claude/scripts/verify-blog-quality.js <파일경로>');
    }

    if (result.warnings && result.warnings.length > 0) {
      console.error('');
      console.error('⚠️  [경고] 확인 권장:');
      console.error('');
      for (const warn of result.warnings) {
        console.error(`   △ ${warn}`);
      }
    }

    console.error('');
    console.error('────────────────────────────────────────────────────────────');
    console.error('📌 골든 스탠다드 체크리스트:');
    console.error('');
    console.error('   [meta]');
    console.error('   ✓ title: 파이프 양쪽 3단어+ 롱테일, 60자 이내');
    console.error('   ✓ keywords: 정확히 4개');
    console.error('   ✓ faq: 2개, sources: 1개+, ctaCard: 필수');
    console.error('');
    console.error('   [구조 — 6섹션 표준]');
    console.error('   ✓ TOC (6항목) → Summary3 (3줄) → sourceBar');
    console.error('   ✓ STEP 01: CheckerShell + CheckerQ × 3~5');
    console.error('   ✓ SECTION 02~05: 키워드 H2 × 4 (각 4문장+)');
    console.error('   ✓ RelatedMid: SECTION 03-04 사이 (3개 카드 + 허브 링크)');
    console.error('   ✓ FAQ: FAQAccordion (2개)');
    console.error('   ✓ RelatedArticles (5개) + PrevNext');
    console.error('');
    console.error('   [컴포넌트]');
    console.error('   ✓ InlineLink 2개+ (desc= 포함)');
    console.error('   ✓ BridgeCard 1~2개 (분산 배치)');
    console.error('   ✓ Info type="warn" 1개+');
    console.error('   ✓ Divider 4개+');
    console.error('');
    console.error('   [레이아웃]');
    console.error('   ✓ BlogLayout sidebar= (2컬럼)');
    console.error('   ✓ SidebarCTA (3개 CTA, hot=true 1개)');
    console.error('   ✓ SidebarDocs (관련 문서 5개)');
    console.error('   ✓ SidebarCalc (인기 계산기 5개)');
    console.error('   ✓ disclaimer= (맞춤 면책)');
    console.error('────────────────────────────────────────────────────────────');
    console.error('');
  }

  if (result.valid) {
    console.log(`✅ 블로그 TSX 품질 검증 v2.0 통과: ${fileName}`);
    if (result.warnings && result.warnings.length > 0) {
      for (const w of result.warnings) {
        console.log(`   △ ${w}`);
      }
    }
  }
}

// ============================================
// 메인 로직: stdin 또는 파일에서 읽기
// ============================================

let inputData = '';
let stdinTimeout = null;

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
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

      const result = validateBlogContent(content, filePath);
      printResults(result, filePath);

      if (!result.valid) process.exit(1);
      process.exit(0);
    } catch (parseError) {
      console.error('⚠️ stdin JSON 파싱 실패');
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
  if (!filePath) process.exit(0);

  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) process.exit(0);

  try {
    const content = fs.readFileSync(absolutePath, 'utf8');
    const result = validateBlogContent(content, absolutePath);
    printResults(result, absolutePath);

    if (!result.valid) {
      console.error('');
      console.error(`❌ TSX 검증 실패: ${absolutePath}`);
      console.error('');
      process.exit(1);
    }
    process.exit(0);
  } catch (readError) {
    console.error(`⚠️ 파일 읽기 실패: ${readError.message}`);
    process.exit(0);
  }
}

setTimeout(() => {
  console.error('⚠️ 검증 타임아웃');
  process.exit(0);
}, 10000);
