#!/usr/bin/env node
/**
 * FAQ 스타일 소제목 → 검색 키워드 스타일 변환
 *
 * 변환 규칙:
 * - ~요? → 명사형 키워드
 * - ~까? → 명사형 키워드
 * - ~면요? → 명사형 키워드
 * - 메인 키워드와 연관있게
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

// FAQ 스타일 → 검색 키워드 변환 매핑
const FAQ_PATTERNS = [
  // 왜 계열
  { pattern: /^##\s*왜\s+(.+?)[요까?？]+$/m, replace: (m, p1) => `## ${p1.replace(/이렇게\s*/, '').replace(/했나$/, '한 이유').replace(/됐나$/, '된 이유').replace(/바뀌었나$/, '변경 이유')}` },
  { pattern: /^##\s*왜\s+(.+?)$/m, replace: (m, p1) => `## ${p1} 이유` },

  // ~도/만 해당 계열
  { pattern: /^##\s*(.+?)도\s+해당[되돼][나요?？]+$/m, replace: (m, p1) => `## ${p1} 적용 대상` },
  { pattern: /^##\s*(.+?)만\s+해당[되돼][나요?？]+$/m, replace: (m, p1) => `## ${p1} 해당 조건` },

  // ~면/하면 계열
  { pattern: /^##\s*(.+?)[면하]\s*면\s*[요?？]+$/m, replace: (m, p1) => `## ${p1.replace(/못\s*/, '불가능한 경우')}` },

  // 금액/기간/조건 계열
  { pattern: /^##\s*금액은\s*[같같아요?？]+$/m, replace: '## 금액 동일 여부' },
  { pattern: /^##\s*기간은\s*[어떻게?？]+$/m, replace: '## 기간 계산' },
  { pattern: /^##\s*조건은\s*[뭐무엇?？]+$/m, replace: '## 수급 조건' },

  // 중복/병행 계열
  { pattern: /^##\s*(.+?)과?\s*중복[되돼][요?？]+$/m, replace: (m, p1) => `## ${p1} 중복 수령` },
  { pattern: /^##\s*(.+?)과?\s*같이\s*받[아을?？]+$/m, replace: (m, p1) => `## ${p1} 병행 수령` },

  // 어떻게 계열
  { pattern: /^##\s*(.+?)\s*어떻게\s*[하하나?？]+$/m, replace: (m, p1) => `## ${p1} 방법` },
  { pattern: /^##\s*어떻게\s*(.+?)[요?？]+$/m, replace: (m, p1) => `## ${p1.replace(/하나$/, '방법').replace(/되나$/, '절차')}` },

  // ~인가요 계열
  { pattern: /^##\s*(.+?)\s*[인가요?？]+$/m, replace: (m, p1) => `## ${p1.replace(/뭔가$/, '란').replace(/언제$/, '시기').replace(/얼마$/, '금액')}` },

  // 누가/무엇 계열
  { pattern: /^##\s*누가\s+(.+?)[요?？]+$/m, replace: (m, p1) => `## ${p1.replace(/봐야\s*하나$/, '대상자')}` },
  { pattern: /^##\s*무엇을?\s+(.+?)[요?？]+$/m, replace: (m, p1) => `## ${p1} 항목` },

  // 간단한 질문 형태
  { pattern: /^##\s*(.{1,20})[요까?？]+$/m, replace: (m, p1) => {
    // 이미 명사형이면 그대로
    if (/이유|방법|조건|대상|금액|기간|절차|항목|계산/.test(p1)) {
      return `## ${p1}`;
    }
    // 동사 → 명사형
    return `## ${p1.replace(/되나$/, '').replace(/하나$/, '')}`;
  }}
];

function convertFAQHeading(content, title, keywords) {
  let converted = content;
  let changeCount = 0;

  // 제목에서 메인 키워드 추출
  const mainKeyword = (keywords && keywords[0]) || title;

  FAQ_PATTERNS.forEach(({ pattern, replace }) => {
    const matches = converted.match(new RegExp(pattern, 'gm'));
    if (matches) {
      matches.forEach(match => {
        let newHeading;

        if (typeof replace === 'function') {
          newHeading = match.replace(pattern, replace);
        } else {
          newHeading = replace;
        }

        // 메인 키워드가 없으면 추가
        if (!newHeading.includes(mainKeyword.split(' ')[0])) {
          // 너무 짧은 헤딩이면 메인 키워드 앞에 붙이기
          if (newHeading.replace('## ', '').length < 10) {
            const baseHeading = newHeading.replace('## ', '');
            newHeading = `## ${mainKeyword.split(' ')[0]} ${baseHeading}`;
          }
        }

        converted = converted.replace(match, newHeading);
        changeCount++;
      });
    }
  });

  return { content: converted, changeCount };
}

function fixFile(filename) {
  const filepath = path.join(WIKI_DIR, filename);
  const fileContent = fs.readFileSync(filepath, 'utf-8');

  try {
    const { data, content: body } = matter(fileContent);

    // FAQ 스타일 헤딩이 없으면 스킵
    if (!/^##\s*.+[요까][?？]$/m.test(body)) {
      return { status: 'skip' };
    }

    const result = convertFAQHeading(body, data.title, data.keywords);

    if (result.changeCount === 0) {
      return { status: 'skip' };
    }

    // 파일 저장
    const newContent = matter.stringify(result.content, data);
    fs.writeFileSync(filepath, newContent, 'utf-8');

    return {
      status: 'fixed',
      changeCount: result.changeCount
    };

  } catch (err) {
    return { status: 'error', error: err.message };
  }
}

function main() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  const results = {
    fixed: [],
    skipped: [],
    errors: []
  };

  console.log('='.repeat(80));
  console.log('FAQ 스타일 소제목 변환 시작...');
  console.log('='.repeat(80));

  files.forEach((filename, idx) => {
    const result = fixFile(filename);

    if (result.status === 'fixed') {
      results.fixed.push({ filename, changeCount: result.changeCount });
      if (results.fixed.length <= 10) {
        console.log(`✅ ${filename}: ${result.changeCount}개 소제목 변환`);
      }
    } else if (result.status === 'skip') {
      results.skipped.push(filename);
    } else {
      results.errors.push({ filename, error: result.error });
      console.log(`❌ ${filename}: ${result.error}`);
    }

    if ((idx + 1) % 100 === 0) {
      console.log(`진행중... ${idx + 1}/${files.length}`);
    }
  });

  console.log('\n' + '='.repeat(80));
  console.log('변환 완료');
  console.log('='.repeat(80));
  console.log(`✅ 수정: ${results.fixed.length}개`);
  console.log(`⏭️  스킵: ${results.skipped.length}개`);
  console.log(`❌ 오류: ${results.errors.length}개`);

  if (results.fixed.length > 10) {
    console.log(`\n(상위 10개만 표시, 전체 ${results.fixed.length}개 수정됨)`);
  }

  // 통계 저장
  fs.writeFileSync(
    path.join(__dirname, 'faq-heading-fix-result.json'),
    JSON.stringify(results, null, 2)
  );

  console.log(`\n📊 상세 결과: scripts/faq-heading-fix-result.json`);
}

main();
