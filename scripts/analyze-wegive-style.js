#!/usr/bin/env node
/**
 * 위기브 스타일 검증 - 위반 파일 추출
 *
 * 검증 항목:
 * 1. 테이블 2개 초과
 * 2. 본문에 FAQ 섹션 존재
 * 3. 이모지 사용
 * 4. description "알아봅니다" 패턴
 * 5. 헤딩에 숫자
 * 6. FAQ 스타일 소제목 (~요?, ~까?)
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WIKI_DIR = path.join(__dirname, '..', 'content', 'wiki');

function analyzeWegiveStyle() {
  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));

  const violations = {
    tooManyTables: [],      // 테이블 2개 초과
    bodyFAQ: [],            // 본문 FAQ 섹션
    hasEmoji: [],           // 이모지 사용
    blogTone: [],           // "알아봅니다" description
    numberedHeading: [],    // 헤딩에 숫자
    faqStyleHeading: [],    // "~요?", "~까?" 소제목
    ok: []
  };

  files.forEach(filename => {
    const filepath = path.join(WIKI_DIR, filename);
    const fileContent = fs.readFileSync(filepath, 'utf-8');

    try {
      const { data, content: body } = matter(fileContent);
      const fileViolations = [];

      // 1. 테이블 2개 초과
      const tableCount = (body.match(/^\|.+\|$/gm) || []).length;
      if (tableCount > 2) {
        fileViolations.push(`테이블 ${tableCount}개`);
        violations.tooManyTables.push({
          file: filename,
          title: data.title,
          tableCount
        });
      }

      // 2. 본문에 FAQ 섹션
      if (/^##\s*(자주\s*묻는\s*질문|FAQ)/im.test(body)) {
        fileViolations.push('본문 FAQ 섹션');
        violations.bodyFAQ.push({
          file: filename,
          title: data.title
        });
      }

      // 3. 이모지 사용
      const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
      if (emojiRegex.test(body)) {
        fileViolations.push('이모지');
        violations.hasEmoji.push({
          file: filename,
          title: data.title
        });
      }

      // 4. description "알아봅니다"
      if (data.description && /알아봅니다|설명합니다|정리했습니다/i.test(data.description)) {
        fileViolations.push('블로그 description');
        violations.blogTone.push({
          file: filename,
          title: data.title,
          description: data.description
        });
      }

      // 5. 헤딩에 숫자
      if (/^##\s*\d+\./m.test(body)) {
        fileViolations.push('숫자 헤딩');
        violations.numberedHeading.push({
          file: filename,
          title: data.title
        });
      }

      // 6. FAQ 스타일 소제목 (~요?, ~까?, ~면요?)
      const faqHeadingMatch = body.match(/^##\s*.+[요까][?？]/m);
      if (faqHeadingMatch) {
        fileViolations.push('FAQ 스타일 소제목');
        violations.faqStyleHeading.push({
          file: filename,
          title: data.title,
          heading: faqHeadingMatch[0]
        });
      }

      if (fileViolations.length === 0) {
        violations.ok.push(filename);
      }

    } catch (err) {
      console.error(`Error parsing ${filename}:`, err.message);
    }
  });

  return violations;
}

function printReport(violations) {
  console.log('='.repeat(80));
  console.log('위기브 스타일 검증 리포트');
  console.log('='.repeat(80));

  console.log(`\n📊 전체 통계:`);
  console.log(`  - 테이블 2개 초과: ${violations.tooManyTables.length}개`);
  console.log(`  - 본문 FAQ 섹션: ${violations.bodyFAQ.length}개`);
  console.log(`  - 이모지 사용: ${violations.hasEmoji.length}개`);
  console.log(`  - 블로그 description: ${violations.blogTone.length}개`);
  console.log(`  - 숫자 헤딩: ${violations.numberedHeading.length}개`);
  console.log(`  - FAQ 스타일 소제목: ${violations.faqStyleHeading.length}개`);
  console.log(`  - OK: ${violations.ok.length}개`);

  // 위반 파일 목록 (재작성 필요)
  const allViolators = new Set();
  Object.keys(violations).forEach(key => {
    if (key !== 'ok') {
      violations[key].forEach(item => {
        allViolators.add(item.file);
      });
    }
  });

  console.log(`\n\n🔴 재작성 필요 파일: ${allViolators.size}개`);
  console.log('='.repeat(80));

  // 상위 20개만 표시
  const violatorsList = Array.from(allViolators).slice(0, 20);
  violatorsList.forEach((filename, idx) => {
    console.log(`${idx + 1}. ${filename}`);
  });

  if (allViolators.size > 20) {
    console.log(`\n... 외 ${allViolators.size - 20}개`);
  }

  // JSON 파일로 전체 목록 저장
  fs.writeFileSync(
    path.join(__dirname, 'wegive-style-violations.json'),
    JSON.stringify({
      total: allViolators.size,
      violations: violations,
      rewriteList: Array.from(allViolators)
    }, null, 2)
  );

  console.log(`\n\n✅ 상세 리포트 저장: scripts/wegive-style-violations.json`);
}

const violations = analyzeWegiveStyle();
printReport(violations);
