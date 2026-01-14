#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '../content/wiki');

// updateNote 자동 결정 키워드
const AMOUNT_KEYWORDS = [
  '상한액', '최저임금', '68100', '66048', '10320',
  '실업급여', '출산휴가', '육아휴직'
];

const LAW_KEYWORDS = [
  '개정', '세법', '근로기준법', '임대차법', '고용보험법',
  '법령', '시행령'
];

function determineUpdateNote(content, currentNote) {
  const text = content.toLowerCase();

  // 이미 구체적인 updateNote가 있으면 유지
  if (currentNote &&
      currentNote !== '2026년 1월 기준' &&
      currentNote !== '2026-01' &&
      !currentNote.includes('내용 수정') &&
      !currentNote.includes('기준')) {
    return currentNote;
  }

  // 금액 관련
  const hasAmount = AMOUNT_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
  if (hasAmount) {
    return '2026년 금액 반영';
  }

  // 법령 개정
  const hasLaw = LAW_KEYWORDS.some(keyword => text.includes(keyword.toLowerCase()));
  if (hasLaw) {
    return '2026년 개정법 반영';
  }

  // 기본값
  return '2026년 기준';
}

function processMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // frontmatter 추출
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    console.log(`⚠️  ${path.basename(filePath)}: frontmatter 없음`);
    return;
  }

  let frontmatterStr = frontmatterMatch[1];
  const bodyContent = content.slice(frontmatterMatch[0].length);

  // 현재 updateNote 추출
  const currentNoteMatch = frontmatterStr.match(/updateNote:\s*["']?([^"'\n]+)["']?/);
  const currentNote = currentNoteMatch ? currentNoteMatch[1].trim() : null;

  // 수정사항 추적
  let modified = false;

  // 1. author 추가 (없으면)
  if (!frontmatterStr.includes('author:')) {
    // lastUpdated 다음 줄에 추가
    frontmatterStr = frontmatterStr.replace(
      /(lastUpdated:.*\n)/,
      '$1author: "머니위키 편집팀"\n'
    );
    modified = true;
  }

  // 2. updateNote 결정
  const newUpdateNote = determineUpdateNote(content, currentNote);
  if (currentNote !== newUpdateNote) {
    if (currentNote) {
      // 기존 updateNote 교체
      frontmatterStr = frontmatterStr.replace(
        /updateNote:\s*["']?[^"'\n]+["']?/,
        `updateNote: "${newUpdateNote}"`
      );
    } else {
      // updateNote 추가 (datePublished 다음 줄에)
      frontmatterStr = frontmatterStr.replace(
        /(datePublished:.*\n)/,
        `$1updateNote: "${newUpdateNote}"\n`
      );
    }
    modified = true;
  }

  // 수정사항 없으면 스킵
  if (!modified) {
    return;
  }

  const newContent = `---\n${frontmatterStr}---${bodyContent}`;

  fs.writeFileSync(filePath, newContent, 'utf-8');

  console.log(`✅ ${path.basename(filePath)}`);
  if (modified) {
    console.log(`   updateNote: ${newUpdateNote}`);
  }
}

function main() {
  console.log('📝 메타데이터 업데이트 시작...\n');

  const files = fs.readdirSync(WIKI_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(WIKI_DIR, file));

  let processed = 0;
  let updated = 0;

  files.forEach(file => {
    try {
      const beforeSize = fs.statSync(file).size;
      processMarkdownFile(file);
      const afterSize = fs.statSync(file).size;

      processed++;
      if (beforeSize !== afterSize) {
        updated++;
      }
    } catch (err) {
      console.log(`❌ ${path.basename(file)}: ${err.message}`);
    }
  });

  console.log(`\n✅ 완료!`);
  console.log(`   처리: ${processed}개 파일`);
  console.log(`   수정: ${updated}개 파일`);
}

main();
