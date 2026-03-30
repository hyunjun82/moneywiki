#!/usr/bin/env node
/**
 * _incoming/ JSX 품질 체크 스크립트
 *
 * 검증 항목:
 * 1. "use client" 존재
 * 2. article-ui import 없음 (빌드 에러 원인)
 * 3. Q1-Q4 주석 존재
 * 4. 금지단어 없음
 * 5. 구어체 사용 확인
 * 6. H2 컴포넌트 자체 정의 확인
 * 7. FAQ 존재
 * 8. References/출처 존재
 * 9. Sidebar 존재
 * 10. 숫자에 출처 URL 동반 확인
 */

const fs = require('fs');
const path = require('path');

const INCOMING_DIR = path.join(__dirname, '..', '_incoming');
const TARGET_BASE = path.join(__dirname, '..', 'src', 'app', 'w');
const REPORT_FILE = path.join(INCOMING_DIR, '_report.json');

// 금지단어 목록 (CLAUDE.md 기준)
const BANNED_WORDS = [
  '또한', '결론적으로', '다양한', '매우 중요', '확인하세요',
  '총정리', '있거든요', '알아보겠습니다', '살펴보겠습니다',
  '정리해드릴게요'
];

// 합니다체 패턴 (구어체 위반)
const FORMAL_PATTERNS = [
  /합니다[.。]?/g,
  /입니다[.。]?/g,
  /하십시오/g,
  /바랍니다/g,
  /드립니다/g,
];

// 필수 자체 정의 컴포넌트
const REQUIRED_SELF_DEFINED = ['H2', 'GreenBox', 'FAQ', 'Sidebar'];

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.jsx');
  const errors = [];
  const warnings = [];

  // 1. "use client" 확인
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    errors.push('[필수] "use client" 선언 없음 → 빌드 에러 발생');
  }

  // 2. article-ui import 차단
  if (/from\s+['"].*article-ui/.test(content)) {
    errors.push('[필수] article-ui import 감지 → 빌드 에러 원인. 자체 정의로 교체 필요');
  }

  // 3. 금지 import 차단
  const bannedImports = ['ArticleLayout', 'ArticleAd', 'InArticleAd'];
  bannedImports.forEach(imp => {
    if (content.includes(imp)) {
      errors.push(`[필수] ${imp} 사용 감지 → 빌드 에러 원인`);
    }
  });

  // 4. Q1-Q4 주석 확인
  const q1 = /Q1[.:]/.test(content);
  const q2 = /Q2[.:]/.test(content);
  const q3 = /Q3[.:]/.test(content);
  const q4 = /Q4[.:]/.test(content);
  if (!q1 || !q2 || !q3 || !q4) {
    const missing = [];
    if (!q1) missing.push('Q1');
    if (!q2) missing.push('Q2');
    if (!q3) missing.push('Q3');
    if (!q4) missing.push('Q4');
    errors.push(`[필수] Q1-Q4 주석 누락: ${missing.join(', ')}`);
  }

  // 5. 금지단어 체크
  BANNED_WORDS.forEach(word => {
    if (content.includes(word)) {
      errors.push(`[문체] 금지단어 "${word}" 사용됨`);
    }
  });

  // 6. em dash 체크
  if (content.includes('—') && !content.includes('// —') && !content.includes('* —')) {
    // JSX 본문 내 em dash만 체크 (주석 제외)
    const jsxContent = content.replace(/\/\/.*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
    if (jsxContent.includes('—')) {
      warnings.push('[문체] em dash(—) 사용 감지 → 제거 권장');
    }
  }

  // 7. 구어체 확인 (합니다/입니다 비율)
  let formalCount = 0;
  FORMAL_PATTERNS.forEach(pat => {
    const matches = content.match(pat);
    if (matches) formalCount += matches.length;
  });
  if (formalCount > 3) {
    errors.push(`[문체] 합니다/입니다체 ${formalCount}회 감지 → 구어체(~이에요/~하죠)로 교체 필요`);
  } else if (formalCount > 0) {
    warnings.push(`[문체] 합니다/입니다체 ${formalCount}회 감지 → 확인 필요`);
  }

  // 8. 필수 자체 정의 컴포넌트 확인
  REQUIRED_SELF_DEFINED.forEach(comp => {
    // function CompName 또는 const CompName 패턴
    const defPattern = new RegExp(`(function\\s+${comp}|const\\s+${comp}\\s*=)`);
    if (!defPattern.test(content)) {
      errors.push(`[구조] ${comp} 컴포넌트 자체 정의 없음`);
    }
  });

  // 9. FAQ 존재 확인
  if (!/faq|FAQ/.test(content)) {
    errors.push('[품질] FAQ 섹션 없음');
  }

  // 10. References/출처 존재 확인
  if (!/References|references|출처/.test(content)) {
    errors.push('[품질] 출처(References) 섹션 없음');
  }

  // 11. CTA 존재 확인
  if (!/CTA|cta|행동.*유도|신청.*바로가기/.test(content)) {
    warnings.push('[품질] CTA(행동 유도) 블록 없음');
  }

  // 12. 외부 출처 URL 확인 (법령/공식기관)
  const urlCount = (content.match(/https?:\/\//g) || []).length;
  if (urlCount < 2) {
    warnings.push(`[출처] 외부 URL ${urlCount}개 → 최소 2개 이상 공식 출처 권장`);
  }

  // 13. H2 개수 확인
  const h2Matches = content.match(/function\s+H2|<H2/g) || [];
  const h2Usage = (content.match(/<H2/g) || []).length;
  if (h2Usage < 3) {
    warnings.push(`[구조] H2 사용 ${h2Usage}회 → 최소 3개 권장`);
  }

  return {
    file: fileName,
    errors,
    warnings,
    pass: errors.length === 0,
    stats: {
      formalCount,
      urlCount,
      h2Usage,
      lineCount: content.split('\n').length
    }
  };
}

function getSlugFromFileName(fileName) {
  // .jsx 확장자 제거
  return fileName.replace(/\.jsx$/, '');
}

function processIncoming() {
  if (!fs.existsSync(INCOMING_DIR)) {
    console.log('_incoming/ 폴더 없음');
    return { files: [], summary: 'no folder' };
  }

  const files = fs.readdirSync(INCOMING_DIR).filter(f => f.endsWith('.jsx'));

  if (files.length === 0) {
    console.log('처리할 JSX 파일 없음');
    return { files: [], summary: 'no files' };
  }

  const results = [];
  let passCount = 0;
  let failCount = 0;

  files.forEach(file => {
    const filePath = path.join(INCOMING_DIR, file);
    const result = validateFile(filePath);
    results.push(result);

    if (result.pass) {
      passCount++;
      const slug = getSlugFromFileName(file);
      const targetDir = path.join(TARGET_BASE, slug);

      // 대상 폴더 생성
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      // page.tsx로 복사 (JSX → TSX)
      const targetFile = path.join(targetDir, 'page.tsx');
      fs.copyFileSync(filePath, targetFile);

      // layout.tsx 생성 (없는 경우만)
      const layoutFile = path.join(targetDir, 'layout.tsx');
      if (!fs.existsSync(layoutFile)) {
        // layout은 별도 생성 필요 → 표시만
        result.needsLayout = true;
      }

      // 원본 → _processed/ 이동
      const processedDir = path.join(INCOMING_DIR, '_processed');
      if (!fs.existsSync(processedDir)) {
        fs.mkdirSync(processedDir, { recursive: true });
      }
      fs.renameSync(filePath, path.join(processedDir, file));

      result.movedTo = targetFile;
      console.log(`✓ PASS: ${file} → ${targetFile}`);
    } else {
      failCount++;
      console.log(`✗ FAIL: ${file}`);
      result.errors.forEach(e => console.log(`  ${e}`));
    }

    if (result.warnings.length > 0) {
      result.warnings.forEach(w => console.log(`  ⚠ ${w}`));
    }
  });

  // 리포트 저장
  const report = {
    timestamp: new Date().toISOString(),
    total: files.length,
    passed: passCount,
    failed: failCount,
    results
  };
  fs.writeFileSync(REPORT_FILE, JSON.stringify(report, null, 2));

  // 누적 카운트 업데이트
  const countFile = path.join(INCOMING_DIR, '_count.json');
  let accumulated = { total: 0, ready_for_push: false };
  if (fs.existsSync(countFile)) {
    accumulated = JSON.parse(fs.readFileSync(countFile, 'utf-8'));
  }
  accumulated.total += passCount;
  accumulated.ready_for_push = accumulated.total >= 100;
  accumulated.last_updated = new Date().toISOString();
  fs.writeFileSync(countFile, JSON.stringify(accumulated, null, 2));

  console.log(`\n--- 요약 ---`);
  console.log(`처리: ${files.length}개 | PASS: ${passCount} | FAIL: ${failCount}`);
  console.log(`누적: ${accumulated.total}개 / 100~200개 목표`);
  if (accumulated.ready_for_push) {
    console.log(`🔔 100개 이상 누적! push 준비 완료`);
  }

  return report;
}

// 실행
processIncoming();
