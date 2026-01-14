#!/usr/bin/env node
/**
 * 전체 문서 팩트 검증
 * - 세율 오류 (15%, 12% 구법)
 * - FAQ 중복 (frontmatter + 본문)
 * - Description 반복 패턴
 * - 단답형 문장
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

// 금지 값 (2026년 기준 구법)
const FORBIDDEN = {
  세액공제_구법: ['15%', '12%'],
  퇴직금_지급기한_구법: ['7일'],
  지연이자_구법: ['15%'],
};

// 금지 패턴
const FORBIDDEN_PATTERNS = {
  description_블로그: /알아봅니다|정리합니다|설명합니다/,
  본문_FAQ: /^##\s*자주\s*묻는\s*질문/m,
  단답형: /^(돼요|있어요|없어요|아니에요)\.\s*$/m,
};

function checkFile(filename) {
  const filepath = path.join(WIKI_DIR, filename);
  const fileContent = fs.readFileSync(filepath, 'utf-8');

  try {
    const { data, content: body } = matter(fileContent);
    const errors = [];

    // 1. 세율 구법 체크
    if ((body.includes('15%') || body.includes('12%')) && body.includes('세액공제')) {
      errors.push({
        type: 'CRITICAL',
        message: '❌ 구 세율 사용 (15%/12%) → 16.5%/13.2% 사용하세요'
      });
    }

    // 2. 퇴직금 지급기한 구법
    if (body.includes('7일') && body.includes('퇴직금')) {
      errors.push({
        type: 'CRITICAL',
        message: '❌ 퇴직금 지급기한 구법 (7일) → 14일로 수정하세요'
      });
    }

    // 3. 지연이자 구법
    if (body.includes('15%') && body.includes('지연이자')) {
      errors.push({
        type: 'CRITICAL',
        message: '❌ 지연이자 구법 (15%) → 연 20%로 수정하세요'
      });
    }

    // 4. FAQ 중복 (frontmatter + 본문)
    if (data.faq && data.faq.length > 0 && FORBIDDEN_PATTERNS.본문_FAQ.test(body)) {
      errors.push({
        type: 'ERROR',
        message: '❌ FAQ 중복 (frontmatter + 본문 "## 자주 묻는 질문")'
      });
    }

    // 5. Description 블로그 패턴
    if (data.description && FORBIDDEN_PATTERNS.description_블로그.test(data.description)) {
      errors.push({
        type: 'WARNING',
        message: `⚠️ Description 블로그 말투: "${data.description}"`
      });
    }

    // 6. 단답형 체크 (본문에서)
    const sentences = body.split(/[.!?]\s+/);
    const 단답형들 = sentences.filter(s => /^(돼요|있어요|없어요|아니에요)$/.test(s.trim()));
    if (단답형들.length > 0) {
      errors.push({
        type: 'WARNING',
        message: `⚠️ 단답형 문장 ${단답형들.length}개 발견`
      });
    }

    // 7. Keywords 개수 체크
    if (data.keywords && data.keywords.length > 15) {
      errors.push({
        type: 'WARNING',
        message: `⚠️ Keywords 과다 (${data.keywords.length}개) → 10-15개 권장`
      });
    }

    return { filename, errors };
  } catch (err) {
    return {
      filename,
      errors: [{ type: 'ERROR', message: `파싱 오류: ${err.message}` }]
    };
  }
}

function main() {
  console.log('='.repeat(80));
  console.log('📋 전체 문서 팩트 검증 시작...');
  console.log('='.repeat(80));

  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  const results = {
    critical: [],
    error: [],
    warning: [],
    clean: []
  };

  files.forEach((file, idx) => {
    const result = checkFile(file);

    if (result.errors.length === 0) {
      results.clean.push(file);
    } else {
      result.errors.forEach(err => {
        const item = { file, message: err.message };
        if (err.type === 'CRITICAL') {
          results.critical.push(item);
        } else if (err.type === 'ERROR') {
          results.error.push(item);
        } else {
          results.warning.push(item);
        }
      });
    }

    if ((idx + 1) % 100 === 0) {
      console.log(`진행중... ${idx + 1}/${files.length}`);
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('📊 검증 결과');
  console.log('='.repeat(80));

  // CRITICAL 오류 (즉시 수정 필요)
  if (results.critical.length > 0) {
    console.log(`\n🚨 CRITICAL (${results.critical.length}개) - 즉시 수정 필요!`);
    results.critical.slice(0, 20).forEach(item => {
      console.log(`\n${item.file}`);
      console.log(`  ${item.message}`);
    });
    if (results.critical.length > 20) {
      console.log(`\n... 외 ${results.critical.length - 20}개`);
    }
  }

  // ERROR (수정 권장)
  if (results.error.length > 0) {
    console.log(`\n\n❌ ERROR (${results.error.length}개) - 수정 권장`);
    results.error.slice(0, 10).forEach(item => {
      console.log(`\n${item.file}`);
      console.log(`  ${item.message}`);
    });
    if (results.error.length > 10) {
      console.log(`\n... 외 ${results.error.length - 10}개`);
    }
  }

  // WARNING (검토 필요)
  if (results.warning.length > 0) {
    console.log(`\n\n⚠️ WARNING (${results.warning.length}개) - 검토 필요`);
    console.log('(상위 5개만 표시)');
    results.warning.slice(0, 5).forEach(item => {
      console.log(`${item.file}: ${item.message}`);
    });
  }

  console.log('\n' + '='.repeat(80));
  console.log('📈 요약');
  console.log('='.repeat(80));
  console.log(`🚨 CRITICAL: ${results.critical.length}개`);
  console.log(`❌ ERROR: ${results.error.length}개`);
  console.log(`⚠️ WARNING: ${results.warning.length}개`);
  console.log(`✅ CLEAN: ${results.clean.length}개`);
  console.log(`📝 총 파일: ${files.length}개`);

  // 결과 JSON 저장
  const output = {
    timestamp: new Date().toISOString(),
    total: files.length,
    critical: results.critical,
    error: results.error,
    warning: results.warning.slice(0, 100), // 상위 100개만
    summary: {
      critical: results.critical.length,
      error: results.error.length,
      warning: results.warning.length,
      clean: results.clean.length
    }
  };

  fs.writeFileSync(
    path.join(__dirname, 'validation-result.json'),
    JSON.stringify(output, null, 2),
    'utf-8'
  );

  console.log('\n상세 결과: scripts/validation-result.json');

  if (results.critical.length > 0 || results.error.length > 0) {
    process.exit(1);
  }
}

main();
