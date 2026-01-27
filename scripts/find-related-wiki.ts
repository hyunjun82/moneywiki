/**
 * 관련 위키 문서 자동 찾기
 *
 * 사용법: npx ts-node scripts/find-related-wiki.ts "실업급여"
 *
 * 출력: 관련 문서 목록 (내부링크 후보)
 */

import * as fs from 'fs';
import * as path from 'path';

const WIKI_DIR = path.join(process.cwd(), 'content/wiki');

interface WikiMeta {
  slug: string;
  title: string;
  category: string;
  keywords: string[];
  relevanceScore: number;
}

// 카테고리 키워드 매핑
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  '근로/노동': ['퇴직금', '임금', '근로', '해고', '실업급여', '노동', '급여', '체불', '계약'],
  '세금': ['세금', '연말정산', '소득세', '양도세', '공제', '세액', '환급', '납부', '홈택스'],
  '부동산': ['전세', '월세', '임대차', '청약', '부동산', '보증금', '계약', '등기', '주택'],
  '복지/연금': ['연금', '보험', '복지', '수당', '지원금', '급여', '국민연금', '건강보험'],
  '금융': ['대출', '이자', '금리', 'DSR', 'LTV', '신용', '카드', '적금', '예금'],
  '법률': ['상속', '증여', '유언', '가압류', '소송', '계약', '법률', '판례', '등기'],
};

// frontmatter 파싱
function parseFrontmatter(content: string): Record<string, any> {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const yaml = match[1];
  const result: Record<string, any> = {};

  // 간단한 YAML 파싱
  let currentKey = '';
  let inArray = false;
  let arrayItems: string[] = [];

  for (const line of yaml.split('\n')) {
    if (line.match(/^(\w+):\s*$/)) {
      // 배열 시작
      if (currentKey && inArray) {
        result[currentKey] = arrayItems;
        arrayItems = [];
      }
      currentKey = line.match(/^(\w+):/)?.[1] || '';
      inArray = true;
    } else if (line.match(/^\s+-\s+/)) {
      // 배열 아이템
      const item = line.replace(/^\s+-\s+/, '').replace(/["']/g, '').trim();
      arrayItems.push(item);
    } else if (line.match(/^(\w+):\s*.+$/)) {
      // 단일 값
      if (currentKey && inArray) {
        result[currentKey] = arrayItems;
        arrayItems = [];
        inArray = false;
      }
      const [, key, value] = line.match(/^(\w+):\s*["']?(.+?)["']?\s*$/) || [];
      if (key) result[key] = value;
    }
  }

  if (currentKey && inArray) {
    result[currentKey] = arrayItems;
  }

  return result;
}

// 관련성 점수 계산
function calculateRelevance(searchKeyword: string, wiki: WikiMeta): number {
  let score = 0;
  const searchLower = searchKeyword.toLowerCase();

  // 제목에 키워드 포함
  if (wiki.title.toLowerCase().includes(searchLower)) {
    score += 10;
  }

  // 슬러그에 키워드 포함
  if (wiki.slug.toLowerCase().includes(searchLower)) {
    score += 8;
  }

  // keywords 배열에 포함
  for (const kw of wiki.keywords) {
    if (kw.toLowerCase().includes(searchLower)) {
      score += 5;
    }
    if (searchLower.includes(kw.toLowerCase())) {
      score += 3;
    }
  }

  return score;
}

// 카테고리 추천
function suggestCategory(keyword: string): string {
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (keyword.includes(kw)) {
        return category;
      }
    }
  }
  return '일반';
}

// 관련 키워드 확장
function expandKeywords(baseKeyword: string): string[] {
  const suffixes = [
    '수급자격', '신청방법', '계산', '조건',
    '대상', '기간', '금액', '절차'
  ];

  const expanded = [baseKeyword];
  for (const suffix of suffixes.slice(0, 3)) {
    expanded.push(`${baseKeyword} ${suffix}`);
  }

  return expanded;
}

async function main() {
  const searchKeyword = process.argv[2];

  if (!searchKeyword) {
    console.log('사용법: npx ts-node scripts/find-related-wiki.ts "키워드"');
    process.exit(1);
  }

  console.log(`\n🔍 "${searchKeyword}" 관련 위키 검색\n`);
  console.log('='.repeat(50));

  // 카테고리 추천
  const suggestedCategory = suggestCategory(searchKeyword);
  console.log(`\n📁 추천 카테고리: ${suggestedCategory}`);

  // 키워드 확장
  const expandedKeywords = expandKeywords(searchKeyword);
  console.log(`\n🏷️ 확장 키워드:`);
  expandedKeywords.forEach((kw, i) => {
    console.log(`   ${i + 1}. ${kw}`);
  });

  // 위키 파일 스캔
  if (!fs.existsSync(WIKI_DIR)) {
    console.log('\n❌ content/wiki 디렉토리가 없습니다.');
    process.exit(1);
  }

  const files = fs.readdirSync(WIKI_DIR).filter(f => f.endsWith('.md'));
  const wikis: WikiMeta[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(WIKI_DIR, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);

    const wiki: WikiMeta = {
      slug: file.replace('.md', ''),
      title: frontmatter.title || file.replace('.md', ''),
      category: frontmatter.category || '일반',
      keywords: frontmatter.keywords || [],
      relevanceScore: 0,
    };

    wiki.relevanceScore = calculateRelevance(searchKeyword, wiki);

    if (wiki.relevanceScore > 0) {
      wikis.push(wiki);
    }
  }

  // 관련성 순 정렬
  wikis.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // 결과 출력
  console.log(`\n📄 관련 위키 (${wikis.length}개 발견):\n`);

  if (wikis.length === 0) {
    console.log('   관련 문서 없음 - 새로 작성 필요');
  } else {
    const top = wikis.slice(0, 10);
    top.forEach((wiki, i) => {
      console.log(`   ${i + 1}. [${wiki.title}](/w/${wiki.slug})`);
      console.log(`      카테고리: ${wiki.category} | 점수: ${wiki.relevanceScore}`);
    });
  }

  // relatedDocs 형식 출력
  console.log(`\n📋 frontmatter용 (복사해서 사용):\n`);
  console.log('relatedDocs:');
  wikis.slice(0, 5).forEach(wiki => {
    console.log(`  - title: "${wiki.title}"`);
    console.log(`    url: "/w/${wiki.slug}"`);
  });

  console.log('\n' + '='.repeat(50));
}

main().catch(console.error);
