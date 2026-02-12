#!/usr/bin/env node

/**
 * 🚨 1급 보안: force-static 검증
 * 모든 page.tsx가 'force-static' 모드인지 검증하고,
 * 금지된 동적 기능 사용을 감지합니다.
 */

const fs = require('fs');
const path = require('path');

// 금지된 동적 기능 패턴
const FORBIDDEN_PATTERNS = [
  { pattern: /export\s+const\s+revalidate\s*=/, message: 'ISR 사용 금지! (revalidate)' },
  { pattern: /export\s+const\s+dynamicParams\s*=\s*true/, message: 'dynamicParams = true 금지!' },
  { pattern: /headers\s*\(\)/, message: 'headers() 사용 금지! (동적 렌더링)' },
  { pattern: /cookies\s*\(\)/, message: 'cookies() 사용 금지! (동적 렌더링)' },
];

// 예외 페이지 (동적이어도 되는 페이지)
const EXCEPTIONS = [
  'src/app/search/page.tsx', // 'use client' 컴포넌트 (브라우저에서 실행)
  'src/app/w/[slug]/page.tsx', // ISR: revalidate=86400, dynamicParams=true (2,000+ 페이지 빌드 최적화)
];

// 재귀적으로 page.tsx 파일 찾기
function findPageFiles(dir, fileList = [], baseDir = dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findPageFiles(filePath, fileList, baseDir);
    } else if (file === 'page.tsx') {
      const relativePath = path.relative(baseDir, filePath);
      fileList.push(relativePath);
    }
  }

  return fileList;
}

function validateForceStatic() {
  console.log('🔍 force-static 모드 검증 시작...\n');

  const appDir = path.join(process.cwd(), 'src', 'app');
  const pageFiles = findPageFiles(appDir);

  let hasErrors = false;
  let hasWarnings = false;

  for (const file of pageFiles) {
    const filePath = path.join(appDir, file);
    const relativePath = `src/app/${file.replace(/\\/g, '/')}`;

    // 예외 페이지 체크
    if (EXCEPTIONS.some(exc => relativePath.includes(exc))) {
      console.log(`⏭️  ${relativePath} (예외 페이지)`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // force-static 선언 확인
    const hasForceStatic = /export\s+const\s+dynamic\s*=\s*['"]force-static['"]/.test(content);

    if (!hasForceStatic) {
      console.error(`❌ ${relativePath}`);
      console.error(`   force-static 선언이 없습니다!`);
      console.error(`   → 파일 상단에 추가하세요: export const dynamic = 'force-static';\n`);
      hasErrors = true;
    } else {
      console.log(`✅ ${relativePath}`);
    }

    // 금지된 패턴 검사
    for (const { pattern, message } of FORBIDDEN_PATTERNS) {
      for (let i = 0; i < lines.length; i++) {
        if (pattern.test(lines[i])) {
          console.error(`❌ ${relativePath}:${i + 1}`);
          console.error(`   ${message}`);
          console.error(`   → 코드: ${lines[i].trim()}\n`);
          hasErrors = true;
        }
      }
    }

    // searchParams 사용 경고 (generateStaticParams 있으면 OK)
    if (/searchParams/.test(content) && !/generateStaticParams/.test(content)) {
      console.warn(`⚠️  ${relativePath}`);
      console.warn(`   searchParams 사용 감지 (동적 렌더링 가능성)`);
      console.warn(`   → generateStaticParams를 구현했는지 확인하세요\n`);
      hasWarnings = true;
    }
  }

  console.log('');

  if (hasErrors) {
    console.error('❌ 검증 실패! CPU 비용 폭탄 위험!\n');
    console.error('💡 자동 수정 명령어:');
    console.error('   node scripts/add-force-static.js\n');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('⚠️  경고가 있지만 빌드는 진행됩니다.\n');
    console.log('💡 빌드 후 반드시 확인:');
    console.log('   모든 페이지가 ○ (Static) 기호인지 체크!\n');
  } else {
    console.log('✅ 모든 페이지가 force-static 모드입니다!\n');
    console.log('🛡️ CPU 비용 폭탄 방지 완료!\n');
  }
}

validateForceStatic();
