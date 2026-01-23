#!/usr/bin/env npx tsx
/**
 * PAA 질문 → 위키 타이틀 변환 스크립트
 *
 * 사용법:
 *   npx tsx scripts/paa-to-wiki-title.ts "묵시적 갱신 후 해지할 수 있나요?"
 *   npx tsx scripts/paa-to-wiki-title.ts --batch paa-questions.txt
 *   npx tsx scripts/paa-to-wiki-title.ts --check "타이틀" (중복 검사만)
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================
// 1. 카테고리 자동 분류
// ============================================
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  '부동산': ['전세', '월세', '임대', '임차', '보증금', '계약', '갱신', '묵시적', '중개', '매매', '등기', '확정일자', '전입신고', '상가', '주택'],
  '근로/노동': ['퇴직금', '근로', '연차', '수당', '해고', '임금', '급여', '노동', '출근', '계약서', '근무', '휴가', '휴직'],
  '세금': ['세금', '세액공제', '소득공제', '연말정산', '양도세', '취득세', '증여세', '상속세', '부가세', '종소세'],
  '고용': ['실업급여', '고용보험', '출산휴가', '육아휴직', '산재', '4대보험'],
  '금융': ['대출', '이자', '금리', '예금', '적금', 'IRP', '연금', '청약'],
  '복지': ['지원금', '수당', '급여', '바우처', '복지', '보조금'],
};

function detectCategory(text: string): string {
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      return category;
    }
  }
  return '기타';
}

// ============================================
// 2. PAA 질문 → 핵심 키워드 추출
// ============================================
const STOPWORDS = ['은', '는', '이', '가', '을', '를', '의', '에', '로', '으로', '와', '과', '도', '만', '까지', '부터', '에서',
  '할', '할수', '수', '있나요', '있어요', '인가요', '하나요', '되나요', '어떻게', '무엇', '뭐', '얼마', '언제', '어디',
  '왜', '누가', '어떤', '몇', '및', '후', '전', '때', '중', '내', '것', '거', '게'];

const ACTION_WORDS = ['신청', '계산', '청구', '작성', '확인', '조회', '신고', '해지', '발급', '납부', '환급', '수령', '지급'];
const ENDINGS = ['방법', '절차', '기준', '조건', '요건', '계산', '비교', '차이'];

function extractKeywords(question: string): string[] {
  // 특수문자 제거, 공백 분리
  const cleaned = question.replace(/[?？!！.,，。·\-_]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = cleaned.split(' ').filter(w => w.length >= 2);

  // 불용어 제거
  const filtered = words.filter(w => !STOPWORDS.includes(w));

  // 중요 키워드 우선 정렬
  const scored = filtered.map(w => ({
    word: w,
    score: ACTION_WORDS.includes(w) ? 10 : (ENDINGS.includes(w) ? 5 : 1)
  }));

  // 점수순 + 원래 순서 유지
  scored.sort((a, b) => b.score - a.score);

  return [...new Set(scored.map(s => s.word))];
}

// ============================================
// 3. 타이틀 패턴 생성 (자연스러운 한국어)
// ============================================
interface TitlePattern {
  type: 'action' | 'condition' | 'comparison' | 'time' | 'possibility';
  templates: string[];  // 여러 템플릿 중 랜덤 선택
}

const TITLE_PATTERNS: Record<string, TitlePattern> = {
  // 가능 여부 질문 (할 수 있나요?)
  possibility: {
    type: 'possibility',
    templates: [
      '{주제} {행동} 가능 여부 및 방법',
      '{주제} {행동} 할 수 있는지 여부와 절차',
      '{주제}에서 {행동} 가능한 경우와 조건',
    ]
  },
  // 해지/종료 관련
  action: {
    type: 'action',
    templates: [
      '{주제} {행동} 방법 및 절차 총정리',
      '{주제} {행동} 하는 법 완벽 가이드',
      '{주제} {행동} 신청 방법과 필요 서류',
    ]
  },
  // 시간/기간 관련
  time: {
    type: 'time',
    templates: [
      '{주제} {기간} 후 {행동} 가능 여부',
      '{주제} {기간} 경과 시 {행동} 효력',
      '{주제} {기간} 지나면 {행동} 되는지',
    ]
  },
  // 차이/비교 질문
  comparison: {
    type: 'comparison',
    templates: [
      '{항목1}과 {항목2}의 차이점 비교',
      '{항목1} vs {항목2} 무엇이 유리한지',
      '{항목1}와 {항목2} 선택 기준과 장단점',
    ]
  },
  // 조건 질문
  condition: {
    type: 'condition',
    templates: [
      '{주제} {행동} 조건 및 자격 요건',
      '{주제} {행동} 하려면 필요한 조건',
      '{주제} {행동} 대상자와 신청 자격',
    ]
  },
};

function detectQuestionType(question: string): TitlePattern['type'] {
  if (question.includes('있나요') || question.includes('가능') || question.includes('되나요')) {
    return 'possibility';
  }
  if (question.includes('차이') || question.includes('비교') || question.includes('다른')) {
    return 'comparison';
  }
  if (question.includes('지나면') || question.includes('후') || question.includes('언제') || question.includes('시점')) {
    return 'time';
  }
  if (question.includes('조건') || question.includes('요건') || question.includes('자격')) {
    return 'condition';
  }
  return 'action';
}

// ============================================
// 4. 위키 타이틀 생성 (자연스러운 한국어)
// ============================================

// 조사 제거 함수
function removeParticles(word: string): string {
  return word
    .replace(/을$|를$|이$|가$|은$|는$|에$|에서$|으로$|로$|와$|과$|의$|도$|만$|까지$|부터$|에게$|한테$|께$/g, '')
    .replace(/할$|하는$|하면$|해서$/g, '');
}

// PAA 질문에서 핵심 요소 추출
function extractQuestionElements(question: string): {
  주제: string;
  행동: string;
  기간?: string;
  항목1?: string;
  항목2?: string;
} {
  const cleaned = question.replace(/[?？!！.,，。]/g, '').trim();

  // 기간 추출 (3개월, 2년 등)
  const periodMatch = cleaned.match(/(\d+\s*(개월|년|일|주))/);
  const 기간 = periodMatch ? periodMatch[1] : undefined;

  // 비교 항목 추출 (A와 B, A과 B)
  const compareMatch = cleaned.match(/(.+?)[와과]\s*(.+?)[의은는이가]/);

  // 주제 추출 (첫 번째 명사구)
  const words = cleaned.split(' ').filter(w => w.length >= 2);

  // 핵심 주제어 찾기 (묵시적 갱신, 계약갱신, 월세 등)
  const topicKeywords = ['묵시적', '계약갱신', '계약', '갱신', '해지', '전세', '월세', '임대', '임차', '퇴직', '연말정산', '청약', '대출'];
  let 주제Words: string[] = [];

  for (const word of words) {
    const cleanWord = removeParticles(word);
    if (topicKeywords.some(k => cleanWord.includes(k))) {
      주제Words.push(cleanWord);
      if (주제Words.length >= 2) break;
    }
  }

  // 주제가 없으면 첫 두 단어 사용
  if (주제Words.length === 0) {
    주제Words = words.slice(0, 2).map(removeParticles);
  }

  // 중복 단어 합치기 (묵시적 계약갱신 → 묵시적 갱신이면 '묵시적 계약갱신'으로)
  let 주제 = 주제Words.join(' ');
  if (주제.includes('계약갱신') && 주제.includes('갱신') && !주제.includes('계약갱신')) {
    주제 = 주제.replace('갱신', '');
  }

  // 행동어 추출
  const actionKeywords = ['해지', '신청', '갱신', '청구', '계산', '확인', '조회', '발급', '중도해지', '철회', '취소', '변경'];
  let 행동 = '';

  for (const word of words) {
    const cleanWord = removeParticles(word);
    for (const action of actionKeywords) {
      if (cleanWord.includes(action) && !주제.includes(action)) {
        행동 = action;  // 순수 행동어만 추출
        break;
      }
    }
    if (행동) break;
  }

  // 행동어 없으면 질문에서 동사 찾기
  if (!행동) {
    const verbMatch = cleaned.match(/(해지|신청|갱신|청구|계산|조회|발급|철회|취소|변경)/);
    행동 = verbMatch ? verbMatch[1] : '';
  }

  // 주제에 행동이 포함되어 있으면 분리
  if (주제.includes(행동) && 행동) {
    // "계약갱신"에서 "갱신"이 행동이면, 주제는 "계약"만
    // 하지만 "묵시적 갱신"의 갱신은 주제의 일부이므로 유지
    if (!주제.startsWith('묵시적') || 행동 !== '갱신') {
      주제 = 주제.replace(행동, '').trim();
    }
  }

  return {
    주제: 주제.trim(),
    행동: 행동 || '확인',
    기간,
    항목1: compareMatch ? removeParticles(compareMatch[1].trim()) : undefined,
    항목2: compareMatch ? removeParticles(compareMatch[2].trim()) : undefined,
  };
}

function generateWikiTitle(question: string): string {
  const questionType = detectQuestionType(question);
  const elements = extractQuestionElements(question);

  // 패턴 선택
  const pattern = TITLE_PATTERNS[questionType];
  const templates = pattern.templates;

  // 질문 내용에 따라 가장 적합한 템플릿 선택
  let template = templates[0];  // 기본값

  // 기간이 있으면 time 템플릿 사용 (기간 정보 포함)
  if (elements.기간) {
    template = '{주제} {기간} 후 {행동} 가능 여부 및 방법';
  }
  // 비교 항목이 있으면 comparison 템플릿
  else if (elements.항목1 && elements.항목2) {
    template = templates[0];
  }

  // 템플릿에 값 대입
  let title = template
    .replace('{주제}', elements.주제)
    .replace('{행동}', elements.행동)
    .replace('{기간}', elements.기간 || '')
    .replace('{항목1}', elements.항목1 || '')
    .replace('{항목2}', elements.항목2 || '');

  // 정리
  title = title
    .replace(/\s+/g, ' ')
    .replace(/\s+및\s+및/g, ' 및')
    .replace(/ 후 후/g, ' 후')
    .trim();

  // 빈 자리 정리
  if (title.includes('  ')) {
    title = title.replace(/\s+/g, ' ');
  }

  return title;
}

// ============================================
// 5. 4개 키워드 생성 (SEO 최적화)
// ============================================

// 키워드에 포함되면 안 되는 불용어 (질문 형식 제거)
const KEYWORD_BLACKLIST = [
  // 질문 어미
  '있나요', '없나요', '되나요', '인가요', '하나요', '할까요', '일까요', '건가요',
  '있지', '없지', '되지', '인지', '하지', '할지', '일지',
  '뭔가요', '뭘까요', '어떻게', '어떤가요',
  // 불완전한 조각
  '알고', '모르고', '싶어요', '원해요', '궁금해요',
  // 기타 불용어
  '가능', '불가능', '여부', '총정리', '완벽', '가이드',
];

function generate4Keywords(title: string, question: string): string[] {
  // 타이틀에서 단어 추출 (깨끗한 키워드 소스)
  const titleWords = title.split(' ').filter(w =>
    w.length >= 2 &&
    !['및', '의', '와', '과', '후', '시', '때'].includes(w) &&
    !KEYWORD_BLACKLIST.some(bl => w.includes(bl))
  );

  // 질문에서 핵심 키워드만 추출 (불용어 철저히 제거)
  const questionWords = extractKeywords(question).filter(w =>
    !KEYWORD_BLACKLIST.some(bl => w.includes(bl)) &&
    !w.endsWith('요') &&  // 질문 어미 제거
    !w.endsWith('지') &&  // 의문형 어미 제거
    w.length >= 2
  );

  // 타이틀 단어 우선, 그 다음 질문 키워드
  const allWords = [...new Set([...titleWords, ...questionWords])];

  // 주제어 2-3개 조합으로 롱테일 키워드 생성
  const keywords: string[] = [];

  // 1. 메인 키워드 (첫 2단어)
  if (allWords.length >= 2) {
    keywords.push(`${allWords[0]} ${allWords[1]}`);
  }

  // 2. 메인 + 행동어 (타이틀에서 찾기)
  const action = titleWords.find(w => ACTION_WORDS.includes(w));
  if (action && allWords[0] && !keywords[0]?.includes(action)) {
    keywords.push(`${allWords[0]} ${action}`);
  }

  // 3. 메인 + 세 번째 단어
  if (allWords.length >= 3 && !keywords.some(k => k.includes(allWords[2]))) {
    keywords.push(`${allWords[0]} ${allWords[2]}`);
  }

  // 4. 두 번째 + 네 번째 (둘 다 유효한 경우만)
  if (allWords.length >= 4) {
    const word4 = allWords[3];
    // 불용어/질문형 단어 체크
    if (word4 && !KEYWORD_BLACKLIST.some(bl => word4.includes(bl))) {
      keywords.push(`${allWords[1]} ${word4}`);
    }
  }

  // 중복 제거
  let unique = [...new Set(keywords)].filter(k => k.trim().length > 0);

  // 4개 미만이면 타이틀 단어로 채우기 (안전한 소스)
  let idx = 0;
  while (unique.length < 4 && idx < titleWords.length) {
    const word = titleWords[idx];
    if (word && !unique.some(k => k.includes(word))) {
      unique.push(word);
    }
    idx++;
  }

  // 최종 검증: 질문 형식 단어 포함된 키워드 제거
  unique = unique.filter(k => !KEYWORD_BLACKLIST.some(bl => k.includes(bl)));

  return unique.slice(0, 4);
}

// ============================================
// 6. 기존 위키 파일 중복 검사
// ============================================
function getExistingTitles(): Map<string, string> {
  const wikiDir = path.join(process.cwd(), 'content', 'wiki');
  const titles = new Map<string, string>();

  if (!fs.existsSync(wikiDir)) {
    return titles;
  }

  const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const content = fs.readFileSync(path.join(wikiDir, file), 'utf-8');
    const titleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
    if (titleMatch) {
      titles.set(titleMatch[1].trim(), file);
    }
  }

  return titles;
}

function checkDuplicate(newTitle: string, existingTitles: Map<string, string>): { isDuplicate: boolean; similar: string[] } {
  const similar: string[] = [];
  const newWords = new Set(newTitle.split(' ').filter(w => w.length >= 2 && !['및', '의'].includes(w)));

  for (const [existingTitle, filename] of existingTitles) {
    const existingWords = new Set(existingTitle.split(' ').filter(w => w.length >= 2 && !['및', '의'].includes(w)));
    const intersection = [...newWords].filter(w => existingWords.has(w));
    const similarity = intersection.length / Math.max(newWords.size, existingWords.size);

    if (similarity >= 0.7) {
      similar.push(`${existingTitle} (${filename})`);
    }
  }

  return {
    isDuplicate: similar.length > 0,
    similar: similar.slice(0, 3)
  };
}

// ============================================
// 7. description 생성 (wegive 스타일)
// ============================================
function generateDescription(question: string, title: string): string {
  const elements = extractQuestionElements(question);

  // 주제 + 행동 기반으로 자연스러운 설명 생성
  const descPatterns = [
    `${elements.주제} ${elements.행동} 방법과 조건을 쉽게 알려드려요`,
    `${elements.주제}에서 ${elements.행동} 할 때 알아야 할 모든 것`,
    `${elements.주제} ${elements.행동} 가능 여부와 절차를 정리했어요`,
    `${elements.주제} ${elements.행동} 할 수 있는지 궁금하셨죠? 자세히 알려드려요`,
  ];

  // 질문 유형에 맞는 패턴 선택
  let desc = descPatterns[0];

  if (question.includes('있나요') || question.includes('가능')) {
    desc = descPatterns[2];
  } else if (question.includes('어떻게') || question.includes('방법')) {
    desc = descPatterns[0];
  } else if (elements.기간) {
    desc = `${elements.주제} ${elements.기간} ${elements.행동} 효력과 절차를 알려드려요`;
  }

  // 길이 조정 (80~120자)
  if (desc.length > 120) {
    desc = desc.slice(0, 117) + '...';
  }

  // 최소 길이 확보
  if (desc.length < 40) {
    desc = `${title}에 대해 자세히 알려드려요`;
  }

  return desc;
}

// ============================================
// 8. slug 생성
// ============================================
function createSlug(title: string): string {
  return title
    .replace(/[?？!！.,，。·:：]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

// ============================================
// 9. YAML 출력
// ============================================
interface WikiResult {
  title: string;
  description: string;
  category: string;
  keywords: string[];
  slug: string;
  filename: string;
  isDuplicate: boolean;
  similar: string[];
}

function processQuestion(question: string, existingTitles: Map<string, string>): WikiResult {
  const title = generateWikiTitle(question);
  const category = detectCategory(question + ' ' + title);
  const keywords = generate4Keywords(title, question);
  const description = generateDescription(question, title);
  const slug = createSlug(title);
  const { isDuplicate, similar } = checkDuplicate(title, existingTitles);

  return {
    title,
    description,
    category,
    keywords,
    slug,
    filename: `${slug}.md`,
    isDuplicate,
    similar
  };
}

function printYaml(result: WikiResult): void {
  console.log('---');
  console.log(`title: "${result.title}"`);
  console.log(`description: "${result.description}"`);
  console.log(`category: "${result.category}"`);
  console.log('keywords:');
  result.keywords.forEach(k => console.log(`  - ${k}`));
  console.log('---');
  console.log('');
  console.log(`📁 파일명: ${result.filename}`);
  console.log(`🔗 URL: /w/${result.slug}`);

  if (result.isDuplicate) {
    console.log('');
    console.log('⚠️  중복 가능성 있음:');
    result.similar.forEach(s => console.log(`   - ${s}`));
  } else {
    console.log('✅ 중복 없음');
  }
}

// ============================================
// 10. 메인 함수
// ============================================
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('사용법:');
    console.log('  npx tsx scripts/paa-to-wiki-title.ts "PAA 질문"');
    console.log('  npx tsx scripts/paa-to-wiki-title.ts --batch questions.txt');
    console.log('  npx tsx scripts/paa-to-wiki-title.ts --check "타이틀"');
    console.log('');
    console.log('예시:');
    console.log('  npx tsx scripts/paa-to-wiki-title.ts "묵시적 갱신 후 해지할 수 있나요?"');
    process.exit(0);
  }

  const existingTitles = getExistingTitles();
  console.log(`📚 기존 위키 문서: ${existingTitles.size}개`);
  console.log('');

  // --check 모드: 중복 검사만
  if (args[0] === '--check') {
    const title = args.slice(1).join(' ');
    const { isDuplicate, similar } = checkDuplicate(title, existingTitles);

    if (isDuplicate) {
      console.log('⚠️  중복 가능성:');
      similar.forEach(s => console.log(`   - ${s}`));
    } else {
      console.log('✅ 중복 없음');
    }
    process.exit(0);
  }

  // --batch 모드: 파일에서 여러 질문 처리
  if (args[0] === '--batch') {
    const filename = args[1];
    if (!filename || !fs.existsSync(filename)) {
      console.error('❌ 파일을 찾을 수 없습니다:', filename);
      process.exit(1);
    }

    const questions = fs.readFileSync(filename, 'utf-8')
      .split('\n')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    console.log(`📝 ${questions.length}개 질문 처리 중...\n`);

    const results: WikiResult[] = [];

    for (const question of questions) {
      const result = processQuestion(question, existingTitles);
      results.push(result);

      // 중복 방지를 위해 새 타이틀도 기존 목록에 추가
      existingTitles.set(result.title, result.filename);
    }

    // 결과 출력
    results.forEach((result, i) => {
      console.log(`\n=== ${i + 1}. ${args[0] !== '--batch' ? '' : questions[i]} ===`);
      printYaml(result);
    });

    // 요약
    const duplicates = results.filter(r => r.isDuplicate).length;
    console.log('\n========================================');
    console.log(`총 ${results.length}개 처리, ${duplicates}개 중복 가능성`);

    process.exit(0);
  }

  // 단일 질문 모드
  const question = args.join(' ');
  console.log(`❓ 질문: ${question}\n`);

  const result = processQuestion(question, existingTitles);
  printYaml(result);
}

main();
