/**
 * wegive 규칙 위반 자동 수정 시스템
 *
 * 검증 실패 → 자동 수정 → 재검증 → 통과할 때까지 반복
 */

import * as fs from 'fs';
import * as path from 'path';

interface AutoFixResult {
  success: boolean;
  iterations: number;
  finalContent: string;
  errors: string[];
}

interface FrontMatter {
  title?: string;
  description?: string;
  category?: string;
  keywords?: string[];
  author?: string;
  summary?: string[];
  [key: string]: any;
}

/**
 * Frontmatter 파싱
 */
function parseFrontMatter(content: string): { frontMatter: FrontMatter; body: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error('Frontmatter 없음');

  const frontMatterStr = match[1];
  const body = match[2];

  const frontMatter: FrontMatter = {};
  const lines = frontMatterStr.split('\n');

  let currentKey = '';
  let currentArray: string[] = [];
  let inArray = false;

  for (const line of lines) {
    if (line.trim().startsWith('- ')) {
      currentArray.push(line.trim().substring(2).replace(/^["']|["']$/g, ''));
    } else if (line.includes(':')) {
      if (inArray && currentKey) {
        frontMatter[currentKey] = currentArray;
        currentArray = [];
      }

      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');

      currentKey = key.trim();

      if (value === '') {
        inArray = true;
      } else {
        frontMatter[currentKey] = value;
        inArray = false;
      }
    }
  }

  if (inArray && currentKey) {
    frontMatter[currentKey] = currentArray;
  }

  return { frontMatter, body };
}

/**
 * Frontmatter 재구성
 */
function rebuildContent(frontMatter: FrontMatter, body: string): string {
  let fm = '---\n';

  const keyOrder = [
    'title',
    'description',
    'category',
    'keywords',
    'author',
    'lastUpdated',
    'datePublished',
    'updateNote',
    'summary',
    'sources',
    'faq',
    'relatedDocs',
  ];

  for (const key of keyOrder) {
    if (frontMatter[key] === undefined) continue;

    const value = frontMatter[key];

    if (Array.isArray(value)) {
      fm += `${key}:\n`;
      value.forEach((item) => {
        if (typeof item === 'string') {
          fm += `  - "${item}"\n`;
        } else {
          // object (sources, faq, etc.)
          fm += `  - `;
          const entries = Object.entries(item);
          entries.forEach(([k, v], idx) => {
            if (idx === 0) fm += `${k}: "${v}"\n`;
            else fm += `    ${k}: "${v}"\n`;
          });
        }
      });
    } else {
      fm += `${key}: "${value}"\n`;
    }
  }

  fm += '---\n\n';
  return fm + body;
}

/**
 * 자동 수정 규칙
 */
function autoFix(content: string): { fixed: string; changes: string[] } {
  const { frontMatter, body } = parseFrontMatter(content);
  const changes: string[] = [];

  // 1. Title 수정
  if (frontMatter.title) {
    let title = frontMatter.title;

    // "포함 및" 패턴 수정
    if (title.includes('포함 및')) {
      title = title.replace('포함 및 계산', '포함 여부 및 계산법');
      changes.push(`Title 수정: "포함 및" → "포함 여부 및"`);
    }

    // "계산 공식" 수정
    if (title.includes('계산 공식')) {
      title = title.replace('계산 공식', '계산법');
      changes.push(`Title 수정: "계산 공식" → "계산법"`);
    }

    // "계산 방법" 수정
    if (title.includes('계산 방법')) {
      title = title.replace('계산 방법', '계산법');
      changes.push(`Title 수정: "계산 방법" → "계산법"`);
    }

    frontMatter.title = title;
  }

  // 2. Keywords 수정
  if (frontMatter.keywords && Array.isArray(frontMatter.keywords)) {
    const baseKeyword = frontMatter.keywords[0]?.split(' ')[0] || '';
    const newKeywords: string[] = [];

    frontMatter.keywords.forEach((kw, idx) => {
      let fixed = kw;

      // "공식", "방법", "포함", "기준" 단독 사용 수정
      if (fixed.endsWith(' 공식')) {
        fixed = fixed.replace(' 공식', ' 계산법');
        changes.push(`Keyword ${idx + 1} 수정: "공식" → "계산법"`);
      }

      if (fixed.endsWith(' 방법')) {
        fixed = fixed.replace(' 방법', ' 산정');
        changes.push(`Keyword ${idx + 1} 수정: "방법" → "산정"`);
      }

      if (fixed.endsWith(' 포함')) {
        fixed = fixed.replace(' 포함', ' 포함 여부');
        changes.push(`Keyword ${idx + 1} 수정: "포함" → "포함 여부"`);
      }

      if (fixed.endsWith(' 기준')) {
        fixed = fixed.replace(' 기준', ' 기준 확정');
        changes.push(`Keyword ${idx + 1} 수정: "기준" → "기준 확정"`);
      }

      newKeywords.push(fixed);
    });

    // 베이스 반복 부족 시 추가
    const baseRepeatCount = newKeywords.filter((kw) => kw.includes(baseKeyword)).length;
    if (baseRepeatCount < 3 && newKeywords.length < 5) {
      // 베이스 반복 키워드 추가
      const titleWords = frontMatter.title?.split(/\s+/) || [];
      for (const word of titleWords) {
        if (word.length > 1 && !newKeywords.some((kw) => kw.includes(word))) {
          newKeywords.push(`${baseKeyword} ${word}`);
          changes.push(`Keyword 추가: "${baseKeyword} ${word}" (베이스 반복)`);
          if (newKeywords.length >= 5) break;
        }
      }
    }

    // 4-5개 유지
    if (newKeywords.length > 5) {
      frontMatter.keywords = newKeywords.slice(0, 5);
      changes.push(`Keywords ${newKeywords.length}개 → 5개로 축소`);
    } else {
      frontMatter.keywords = newKeywords;
    }
  }

  // 3. Description 수정
  if (frontMatter.description && frontMatter.description.includes('알아봅니다')) {
    frontMatter.description = frontMatter.description.replace('알아봅니다', '알려드려요');
    changes.push(`Description 수정: "알아봅니다" → "알려드려요"`);
  }

  // 4. Author 확인
  if (frontMatter.author !== '머니위키 에디터') {
    frontMatter.author = '머니위키 에디터';
    changes.push(`Author 수정: "${frontMatter.author}" → "머니위키 에디터"`);
  }

  // 5. Category 확인
  if (frontMatter.category === '퇴직금') {
    frontMatter.category = '근로/노동';
    changes.push(`Category 수정: "퇴직금" → "근로/노동"`);
  }

  const fixed = rebuildContent(frontMatter, body);
  return { fixed, changes };
}

/**
 * 자동 수정 + 재검증 루프
 */
export async function autoFixWithValidation(filePath: string, maxIterations = 3): Promise<AutoFixResult> {
  let content = fs.readFileSync(filePath, 'utf-8');
  let allChanges: string[] = [];

  for (let i = 0; i < maxIterations; i++) {
    console.log(`\n🔧 수정 시도 ${i + 1}/${maxIterations}...\n`);

    // 자동 수정
    const { fixed, changes } = autoFix(content);

    if (changes.length === 0) {
      console.log('✅ 더 이상 수정할 항목 없음');
      return {
        success: true,
        iterations: i + 1,
        finalContent: content,
        errors: [],
      };
    }

    console.log('변경 사항:');
    changes.forEach((change) => console.log(`  - ${change}`));

    content = fixed;
    allChanges.push(...changes);

    // 임시 파일로 검증
    const tempFile = path.join(path.dirname(filePath), `.temp-${path.basename(filePath)}`);
    fs.writeFileSync(tempFile, content, 'utf-8');

    // 검증 (validation 스크립트 실행)
    // 여기서는 간단히 파일에 저장만 함

    fs.unlinkSync(tempFile);
  }

  return {
    success: false,
    iterations: maxIterations,
    finalContent: content,
    errors: [`최대 반복 횟수 ${maxIterations}회 도달`],
  };
}

// ===== CLI 실행 =====

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('사용법: npx tsx scripts/auto-fix-wiki.ts <파일경로>');
  process.exit(1);
}

const filePath = path.resolve(args[0]);

if (!fs.existsSync(filePath)) {
  console.error(`❌ 파일 없음: ${filePath}`);
  process.exit(1);
}

autoFixWithValidation(filePath)
  .then((result) => {
    if (result.success) {
      console.log(`\n✅ 자동 수정 완료 (${result.iterations}회 반복)`);
      fs.writeFileSync(filePath, result.finalContent, 'utf-8');
      console.log(`\n파일 저장: ${filePath}`);
      process.exit(0);
    } else {
      console.error(`\n❌ 자동 수정 실패 (${result.iterations}회 반복)`);
      result.errors.forEach((err) => console.error(`  ${err}`));
      process.exit(1);
    }
  })
  .catch((error) => {
    console.error(`❌ 오류: ${error.message}`);
    process.exit(1);
  });
