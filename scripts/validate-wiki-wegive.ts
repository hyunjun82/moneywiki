/**
 * wegive-template-full.md 규칙 검증 스크립트
 *
 * 실행: npx ts-node scripts/validate-wiki-wegive.ts content/wiki/파일명.md
 *
 * 검증 항목:
 * 1. Title 자연스러움 (학술적 표현 금지)
 * 2. Keywords 4-5개 (실제 검색어)
 * 3. Keywords 베이스 반복 패턴
 * 4. 금지 단어 감지
 * 5. H2 섹션명 키워드 포함
 */

import * as fs from 'fs';
import * as path from 'path';

interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

interface FrontMatter {
  title?: string;
  description?: string;
  category?: string;
  keywords?: string[];
  author?: string;
  summary?: string[];
}

// ===== 금지 패턴 =====

const FORBIDDEN_TITLE_PATTERNS = [
  '총정리',
  '완벽가이드',
  '완벽 가이드',
  '확인하기',
  '알아보기',
  '알아봅시다',
  '~란',
  '~이란',
  '뭐예요',
];

const ACADEMIC_KEYWORDS = [
  '계산 공식',
  '공식',
  '계산 방법',
  '방법',
  '포함 기준',
  '기준 확인',
  '포함 여부',
  '계산 포함',
  '확인',
];

const FORBIDDEN_DESCRIPTION_PATTERNS = ['알아봅니다', '알아보겠습니다'];

// ===== Title 검증 =====

function validateTitle(title: string): string[] {
  const errors: string[] = [];

  // 금지 패턴 체크
  for (const pattern of FORBIDDEN_TITLE_PATTERNS) {
    if (title.includes(pattern)) {
      errors.push(`❌ Title에 금지 단어 "${pattern}" 포함`);
    }
  }

  // "계산 공식" 학술적 표현 체크
  if (title.includes('계산 공식')) {
    errors.push(`❌ Title: "계산 공식" → 누가 이렇게 검색? "계산법" 또는 "계산" 사용`);
  }

  // "계산 방법" 체크 - 조사(및/와/과)가 없고 단순한 경우만
  const hasConnector = ['및', '와', '과', '의', '에', '로', '으로'].some(c => title.includes(c));
  if (title.includes('계산 방법') && !hasConnector) {
    errors.push(`❌ Title: "계산 방법" → 블로그 투! "계산" 또는 "산정" 사용, 또는 조사(및/와/과)로 자연스럽게 연결`);
  }

  // "포함 및 계산" 패턴 체크
  if (title.includes('포함 및')) {
    errors.push(`❌ Title: "포함 및 ~" → "포함"이 롱테일 아님! "포함 여부", "포함 조건" 등 구체적으로`);
  }

  // Title 내 중복 유사어 체크 (대상/자격, 조건/요건 등)
  const redundantPairs = [
    ['대상', '자격'],
    ['조건', '요건'],
    ['방법', '절차'],
    ['확인', '조회'],
  ];
  for (const [word1, word2] of redundantPairs) {
    if (title.includes(word1) && title.includes(word2)) {
      errors.push(`❌ Title에 "${word1}"과 "${word2}" 중복 → 하나만 사용`);
    }
  }

  // Title 길이 체크 (너무 길거나 짧으면 경고)
  if (title.length < 10) {
    errors.push(`⚠️ Title 너무 짧음 (${title.length}자) - 단일 키워드?`);
  }

  if (title.length > 50) {
    errors.push(`⚠️ Title 너무 김 (${title.length}자) - 롱테일 과다`);
  }

  // ===== 타이틀 자연스러움 검증 (NEW) =====
  const naturalnessErrors = validateTitleNaturalness(title);
  errors.push(...naturalnessErrors);

  return errors;
}

// ===== 타이틀 자연스러움 검증 함수 =====

function validateTitleNaturalness(title: string): string[] {
  const errors: string[] = [];

  // 1. 조사 사용 체크
  const connectors = ['및', '와', '과', '의', '에', '로', '으로'];
  const hasConnector = connectors.some(c => title.includes(c));
  const wordCount = title.split(/\s+/).length;

  // 4개 이상 단어가 조사 없이 나열되면 경고
  if (wordCount >= 4 && !hasConnector) {
    errors.push(`❌ 타이틀이 키워드 나열식 (조사 없음) → 및/와/과 사용해서 자연스럽게 연결`);
  }

  // 2. 자연스러운 종결 체크
  const naturalEndings = ['방법', '계산', '산정', '신청', '받기', '조회', '절차', '기준', '조건'];
  const hasNaturalEnding = naturalEndings.some(e => title.endsWith(e));

  if (!hasNaturalEnding && wordCount >= 3) {
    errors.push(`⚠️ 타이틀 종결어 부족 → ~방법, ~계산, ~산정, ~신청 등 사용`);
  }

  // 3. 어색한 숫자 배치 패턴 감지
  const hasWeirdNumberPattern = /\d+일\s+\S+/.test(title) || /\S+\s+\d+일/.test(title);
  if (hasWeirdNumberPattern) {
    errors.push(`❌ 타이틀에 숫자가 어색하게 배치됨 (예: "30일 근속연수") → 자연스러운 문장으로`);
  }

  // 4. "방법" 중복 체크
  const methodCount = (title.match(/방법/g) || []).length;
  if (methodCount > 1) {
    errors.push(`❌ 타이틀에 "방법"이 ${methodCount}번 중복 → 하나만 사용`);
  }

  return errors;
}

// ===== Keywords 검증 =====

function validateKeywords(keywords: string[], title: string): string[] {
  const errors: string[] = [];

  // 1. 개수 체크
  if (keywords.length < 4 || keywords.length > 5) {
    errors.push(`❌ Keywords ${keywords.length}개 → 4-5개 고정!`);
  }

  // 2. 학술적 표현 체크
  for (const kw of keywords) {
    for (const academic of ACADEMIC_KEYWORDS) {
      if (kw === academic || kw.endsWith(academic)) {
        errors.push(`❌ Keyword "${kw}" → 학술적 표현! 실제 검색어 사용`);
      }
    }
  }

  // 3. "포함", "공식", "방법", "기준" 단독 사용 체크
  const singleForbidden = ['포함', '공식', '방법', '기준', '확인'];
  for (const kw of keywords) {
    const lastWord = kw.split(' ').pop() || '';
    if (singleForbidden.includes(lastWord)) {
      errors.push(`❌ Keyword "${kw}" → "${lastWord}" 단독 사용 금지! 구체화 필요 (예: "포함 여부", "계산법")`);
    }
  }

  // 4. 베이스 반복 패턴 체크
  const titleWords = title.split(/\s+/);
  const baseKeyword = keywords[0]; // 첫 번째 = 베이스

  let baseRepeatCount = 0;
  for (const kw of keywords) {
    if (kw.includes(baseKeyword.split(' ')[0])) {
      baseRepeatCount++;
    }
  }

  if (baseRepeatCount < 3) {
    errors.push(
      `⚠️ Keywords 베이스 반복 부족 (${baseRepeatCount}/4-5) - 베이스 "${baseKeyword.split(' ')[0]}" 반복 필요`
    );
  }

  // 5. Title 단어 그대로 쪼갠 것 체크
  const titleOnlyWords = keywords.filter((kw) => {
    const kwWords = kw.split(' ');
    return kwWords.every((w) => title.includes(w));
  });

  if (titleOnlyWords.length === keywords.length) {
    errors.push(`❌ Keywords가 Title 단어 그대로 쪼갠 것! 베이스 반복 패턴 적용 필요`);
  }

  return errors;
}

// ===== Description 검증 =====

function validateDescription(description: string): string[] {
  const errors: string[] = [];

  for (const pattern of FORBIDDEN_DESCRIPTION_PATTERNS) {
    if (description.includes(pattern)) {
      errors.push(`❌ Description: "${pattern}" 금지 → "~해요" 패턴 사용`);
    }
  }

  if (description.length > 160) {
    errors.push(`⚠️ Description 너무 김 (${description.length}자) → 160자 이내 권장`);
  }

  return errors;
}

// ===== Category 검증 =====

function validateCategory(category: string): string[] {
  const errors: string[] = [];
  const validCategories = ['근로/노동', '세금', '부동산', '금융', '복지'];

  if (!validCategories.includes(category)) {
    errors.push(`⚠️ Category "${category}" → 표준 카테고리 사용 권장: ${validCategories.join(', ')}`);
  }

  return errors;
}

// ===== H2 섹션 검증 =====

function validateH2Sections(content: string, keywords: string[]): string[] {
  const errors: string[] = [];

  // H2 추출
  const h2Regex = /^## (.+)$/gm;
  const h2Sections: string[] = [];
  let match;

  while ((match = h2Regex.exec(content)) !== null) {
    h2Sections.push(match[1]);
  }

  if (h2Sections.length === 0) {
    errors.push(`❌ H2 섹션이 없습니다`);
    return errors;
  }

  // H2에 keywords 포함 여부 체크
  const keywordInH2Count = keywords.filter((kw) => {
    const kwWords = kw.split(' ');
    return h2Sections.some((h2) => kwWords.some((w) => h2.includes(w)));
  }).length;

  if (keywordInH2Count < 3) {
    errors.push(`⚠️ H2 섹션에 Keywords 포함 부족 (${keywordInH2Count}/4-5) - H2에 키워드 자연스럽게 포함 필요`);
  }

  return errors;
}

// ===== Frontmatter 파싱 =====

function parseFrontMatter(fileContent: string): { frontMatter: FrontMatter; content: string } {
  // Windows (\r\n) 및 Unix (\n) 줄바꿈 모두 지원
  const frontMatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontMatterRegex);

  if (!match) {
    throw new Error('Frontmatter를 찾을 수 없습니다');
  }

  const frontMatterStr = match[1];
  const content = match[2];

  // 간단한 YAML 파싱 (keywords, summary 배열 처리)
  const frontMatter: FrontMatter = {};
  const lines = frontMatterStr.split('\n');

  let currentKey = '';
  let currentArray: string[] = [];
  let inArray = false;

  for (const line of lines) {
    if (line.trim().startsWith('- ')) {
      // 배열 아이템
      currentArray.push(line.trim().substring(2).replace(/^["']|["']$/g, ''));
    } else if (line.includes(':')) {
      // 새로운 키
      if (inArray && currentKey) {
        (frontMatter as any)[currentKey] = currentArray;
        currentArray = [];
      }

      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');

      currentKey = key.trim();

      if (value === '') {
        inArray = true;
      } else {
        (frontMatter as any)[currentKey] = value;
        inArray = false;
      }
    }
  }

  // 마지막 배열 처리
  if (inArray && currentKey) {
    (frontMatter as any)[currentKey] = currentArray;
  }

  return { frontMatter, content };
}

// ===== 메인 검증 함수 =====

function validateWikiArticle(filePath: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 파일 읽기
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Frontmatter 파싱
  const { frontMatter, content } = parseFrontMatter(fileContent);

  console.log(`\n🔍 검증 중: ${path.basename(filePath)}\n`);

  // 1. Title 검증
  if (frontMatter.title) {
    const titleErrors = validateTitle(frontMatter.title);
    errors.push(...titleErrors);
  } else {
    errors.push('❌ Title이 없습니다');
  }

  // 2. Keywords 검증
  if (frontMatter.keywords && frontMatter.keywords.length > 0) {
    const keywordErrors = validateKeywords(frontMatter.keywords, frontMatter.title || '');
    errors.push(...keywordErrors);
  } else {
    errors.push('❌ Keywords가 없습니다');
  }

  // 3. Description 검증
  if (frontMatter.description) {
    const descErrors = validateDescription(frontMatter.description);
    errors.push(...descErrors);
  } else {
    errors.push('❌ Description이 없습니다');
  }

  // 4. Category 검증
  if (frontMatter.category) {
    const catErrors = validateCategory(frontMatter.category);
    warnings.push(...catErrors);
  } else {
    errors.push('❌ Category가 없습니다');
  }

  // 5. Author 검증
  if (frontMatter.author !== '머니위키 에디터') {
    errors.push(`❌ Author: "${frontMatter.author}" → "머니위키 에디터" 고정`);
  }

  // 6. Summary 검증
  if (!frontMatter.summary || frontMatter.summary.length !== 3) {
    errors.push(`❌ Summary: ${frontMatter.summary?.length || 0}줄 → 3줄 고정`);
  }

  // 7. H2 섹션 검증
  if (frontMatter.keywords) {
    const h2Errors = validateH2Sections(content, frontMatter.keywords);
    warnings.push(...h2Errors);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ===== CLI 실행 =====

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('사용법: npx tsx scripts/validate-wiki-wegive.ts <파일경로>');
  process.exit(1);
}

const filePath = path.resolve(args[0]);

if (!fs.existsSync(filePath)) {
  console.error(`❌ 파일을 찾을 수 없습니다: ${filePath}`);
  process.exit(1);
}

try {
  const result = validateWikiArticle(filePath);

  // 결과 출력
  if (result.errors.length > 0) {
    console.log('🚨 **오류 (즉시 수정 필요)**:\n');
    result.errors.forEach((err) => console.log(`  ${err}`));
    console.log('');
  }

  if (result.warnings.length > 0) {
    console.log('⚠️  **경고 (권장 수정)**:\n');
    result.warnings.forEach((warn) => console.log(`  ${warn}`));
    console.log('');
  }

  if (result.valid) {
    console.log('✅ **검증 통과!**\n');
    process.exit(0);
  } else {
    console.log(`❌ **검증 실패**: ${result.errors.length}개 오류\n`);
    process.exit(1);
  }
} catch (error: any) {
  console.error(`❌ 검증 중 오류: ${error.message}`);
  process.exit(1);
}

export { validateWikiArticle };
export type { ValidationResult };
