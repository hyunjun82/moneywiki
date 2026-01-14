#!/usr/bin/env node
/**
 * FAQ 스타일 소제목 → 검색 키워드 스타일 변환 (강화 버전)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

function convertFAQHeading(content, title, keywords) {
  let converted = content;
  let changeCount = 0;

  // 메인 키워드 추출
  const mainKeyword = (keywords && keywords[0]) || title;
  const mainWord = mainKeyword.split(' ')[0];

  // 모든 ## 헤딩 찾기
  const headingRegex = /^##\s+(.+)$/gm;
  const headings = content.match(headingRegex) || [];

  headings.forEach(heading => {
    const h2Text = heading.replace(/^##\s+/, '');

    // 이미 명사형이면 스킵
    if (/출처|관련\s*문서|FAQ/.test(h2Text)) {
      return;
    }

    let newText = h2Text;

    // 패턴별 변환
    // 1. ~나요?, ~나?, ~나 → 명사형
    if (/[나][요?？]?$/.test(h2Text)) {
      newText = h2Text
        .replace(/어떻게\s+정해지나[요?？]?$/, '결정 기준')
        .replace(/얼마나\s+되나[요?？]?$/, '기간')
        .replace(/얼마나\s+될[요?？]?$/, '금액')
        .replace(/어떻게\s+하나[요?？]?$/, '방법')
        .replace(/어떻게\s+되나[요?？]?$/, '절차')
        .replace(/무엇인가[요?？]?$/, '')
        .replace(/뭔가[요?？]?$/, '란')
        .replace(/언제[인가나][요?？]?$/, '시기')
        .replace(/되나[요?？]?$/, '')
        .replace(/하나[요?？]?$/, '')
        .replace(/받나[요?？]?$/, '수령')
        .replace(/인가[요?？]?$/, '');
    }

    // 2. ~요?, ~어요?, ~아요? → 명사형
    if (/[요][?？]$/.test(h2Text)) {
      newText = h2Text
        .replace(/같[아요?？]+$/, '동일 여부')
        .replace(/달라[요?？]+$/, '차이점')
        .replace(/되[요?？]+$/, '')
        .replace(/해[요?？]+$/, '')
        .replace(/예[요?？]+$/, '')
        .replace(/[요?？]+$/, '');
    }

    // 3. ~어, ~아 → 명사형
    if (/[어아]$/.test(h2Text)) {
      newText = h2Text
        .replace(/크지\s*않아$/, '차이')
        .replace(/필요해$/, '필요 조건')
        .replace(/됐어$/, '변경 내역')
        .replace(/돼$/, '')
        .replace(/해$/, '')
        .replace(/[어아]$/, '');
    }

    // 4. ~까요? → 명사형
    if (/까[요?？]+$/.test(h2Text)) {
      newText = h2Text
        .replace(/얼마\s*받을\s*수\s*있을까[요?？]+$/, '수령 금액')
        .replace(/되[나을까][요?？]+$/, '')
        .replace(/까[요?？]+$/, '');
    }

    // 변환되었으면 메인 키워드 확인
    if (newText !== h2Text) {
      // 너무 짧거나 메인 키워드 없으면 추가
      if (newText.length < 8 && !newText.includes(mainWord)) {
        newText = `${mainWord} ${newText}`;
      }

      const newHeading = `## ${newText}`;
      converted = converted.replace(heading, newHeading);
      changeCount++;
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
    if (!/^##\s*.+[나요어아까][요?？]?$/m.test(body)) {
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
  console.log('FAQ 스타일 소제목 변환 (V2 강화판)...');
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

  fs.writeFileSync(
    path.join(__dirname, 'faq-heading-fix-v2-result.json'),
    JSON.stringify(results, null, 2)
  );

  console.log(`\n📊 상세 결과: scripts/faq-heading-fix-v2-result.json`);
}

main();
