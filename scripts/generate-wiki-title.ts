/**
 * generate-wiki-title.ts v2.0
 *
 * 롱테일 키워드 4개 이상 포함된 자연스러운 타이틀 생성기
 * - 단일 키워드/PAA 질문 → 4개 키워드 확장
 * - 기존 1548개 글 중복 체크
 * - 자연스러움 검증 (조사 + 종결어)
 *
 * 사용법:
 *   npx tsx scripts/generate-wiki-title.ts "퇴직금"
 *   npx tsx scripts/generate-wiki-title.ts "묵시적 갱신 기간은 어떻게 계산하나요?"
 *   npx tsx scripts/generate-wiki-title.ts "퇴직금 계산"
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================
// 타입 정의
// ============================================
interface TitleResult {
  title: string;
  keywords: string[];
  slug: string;
  filename: string;
  score: number;
}

// ============================================
// 1. 기존 위키 타이틀 로드
// ============================================
function loadExistingTitles(): string[] {
  const wikiDir = path.join(process.cwd(), 'content', 'wiki');

  if (!fs.existsSync(wikiDir)) {
    console.log('⚠️ content/wiki 디렉토리가 없습니다.');
    return [];
  }

  const files = fs.readdirSync(wikiDir).filter(f => f.endsWith('.md'));
  const titles: string[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(wikiDir, file), 'utf-8');
      const titleMatch = content.match(/^title:\s*["']?([^"'\n]+)["']?/m);
      if (titleMatch) {
        titles.push(titleMatch[1].trim());
      }
    } catch (e) {
      // 파일 읽기 실패 무시
    }
  }

  return titles;
}

// ============================================
// 2. 키워드 확장 맵 (도메인별)
// ============================================
const KEYWORD_EXPANSION: Record<string, string[]> = {
  // 퇴직금 관련 (행동어 포함!)
  '퇴직금': ['지급', '계산', '평균임금', '산정', '근속연수', '기한', '조건', '세금', '중간정산'],
  '퇴직금 미지급': ['신고', '절차', '지연이자', '청구', '노동청', '진정'],
  '미지급': ['신고', '절차', '지연이자', '청구', '노동청', '진정'],
  '퇴직연금': ['수령', 'DC형', 'DB형', 'IRP', '이전', '해지', '운용', '수익률', '의무화'],
  'IRP': ['세액공제', '한도', '연말정산', '절세', '중도인출', '해지', '수령', '이체', '계산'],
  'IRP 세액공제': ['한도', '연말정산', '절세', '계산', '신청'],
  '퇴직소득세': ['계산', '세율', '분리과세', '비과세', '신고', '공제'],
  '평균임금': ['산정', '계산', '기준', '포함', '제외', '수당', '상여금'],
  '근속연수': ['계산', '기준', '포함', '제외', '기간', '인정'],
  '지연이자': ['계산', '청구', '이율', '20%', '신청'],

  // 임대차 관련
  '묵시적갱신': ['기간', '계산', '해지', '통보', '임대인', '임차인', '효과'],
  '계약갱신청구권': ['행사', '거절', '사유', '기간', '임대인'],
  '전세': ['보증금', '반환', '계약', '대출', '사기', '확정일자', '전입신고', '청구'],
  '전세 보증금': ['반환', '청구', '내용증명', '작성', '소송'],
  '보증금': ['반환', '청구', '내용증명', '작성', '소송', '기한'],
  '보증금 반환': ['청구', '내용증명', '작성', '소송', '기한'],
  '월세': ['계약', '세액공제', '전환', '인상', '한도', '신고'],
  '임대차': ['보호법', '계약', '신고', '기간', '갱신', '해지'],
  '내용증명': ['작성', '양식', '발송', '효력', '비용'],

  // 연말정산 관련
  '연말정산': ['공제', '세액공제', '소득공제', '한도', '신청', '환급', '절세', '계산'],
  '연말정산 의료비': ['공제', '세액공제', '한도', '대상', '신청', '계산'],
  '신용카드': ['공제', '한도', '사용액', '체크카드', '현금영수증', '공제율', '계산'],
  '의료비': ['공제', '세액공제', '한도', '대상', '범위', '신청', '계산'],
  '의료비 공제': ['조건', '한도', '대상', '범위', '신청', '계산'],
  '교육비': ['공제', '세액공제', '한도', '대상', '대학등록금', '계산'],
  '세액공제': ['한도', '신청', '계산', '절세', '연말정산'],

  // 실업급여 관련
  '실업급여': ['수급', '조건', '신청', '기간', '계산', '자격', '금액'],
  '실업급여 수급': ['조건', '신청', '기간', '계산', '자격'],

  // 부동산 관련
  '양도소득세': ['비과세', '요건', '계산', '세율', '신고', '1세대1주택'],
  '양도소득세 비과세': ['요건', '조건', '계산', '1세대1주택', '거주기간'],
  '비과세': ['요건', '조건', '계산', '적용', '신청'],
  '취득세': ['계산', '세율', '감면', '신고', '납부', '중과'],
  '증여세': ['계산', '세율', '면제', '한도', '신고'],
  '상속세': ['계산', '세율', '공제', '신고', '납부'],

  // 근로 관련
  '연차': ['수당', '계산', '발생', '사용', '촉진', '미사용', '지급'],
  '연차 수당': ['계산', '지급', '기준', '미사용', '청구'],
  '수당': ['계산', '지급', '기준', '청구'],
  '육아휴직': ['급여', '신청', '조건', '기간', '복직', '연장'],
  '출산휴가': ['급여', '신청', '기간', '조건', '대상'],
  '근로계약': ['해지', '기간', '조건', '위반', '작성'],

  // 청약 관련
  '청약': ['조건', '가점', '당첨', '자격', '1순위', '통장', '계산'],
  '주택청약': ['조건', '가점', '당첨', '자격', '1순위', '점수', '계산'],
};

// ============================================
// 3. 자연스러운 타이틀 패턴
// ============================================
// "및"은 공문서체라 어색함. 실제 검색어 패턴 사용
// 예: "양도소득세 비과세 조건과 계산방법"
// 예: "퇴직금 평균임금 산정기준과 계산방법"
const CONNECTORS = ['및', '과', '와'];  // "및"도 허용 (위기브 스타일)
const ENDINGS = ['방법', '계산', '조건', '기준', '절차', '신청', '확인', '산정', '받기', '조회'];

// 자연스러운 타이틀 템플릿
// {주제} {세부1} {세부2}과 {종결}
const TITLE_TEMPLATES = [
  '{0} {1} 조건과 {2}방법',      // 양도소득세 비과세 조건과 계산방법
  '{0} {1} 기준과 {2}방법',      // 퇴직금 지급 기준과 계산방법
  '{0} {1} {2}과 신청방법',      // 연말정산 의료비 공제와 신청방법
  '{0} {1} 조건 {2} 계산방법',   // 실업급여 수급 조건 기간 계산방법
  '{0} {1} {2} 총정리',          // 연차 수당 계산 총정리
];

// ============================================
// 4. PAA 질문에서 키워드 추출
// ============================================
function extractKeywordsFromPAA(paa: string): string[] {
  // 질문 형태 제거
  const cleaned = paa
    .replace(/은\s*어떻게/g, ' ')
    .replace(/는\s*어떻게/g, ' ')
    .replace(/을\s*어떻게/g, ' ')
    .replace(/를\s*어떻게/g, ' ')
    .replace(/이\s*어떻게/g, ' ')
    .replace(/가\s*어떻게/g, ' ')
    .replace(/\?/g, '')
    .replace(/되나요/g, '')
    .replace(/하나요/g, '')
    .replace(/인가요/g, '')
    .replace(/할까요/g, '')
    .replace(/있나요/g, '')
    .replace(/없나요/g, '')
    .replace(/무엇인가요/g, '')
    .replace(/얼마인가요/g, '')
    .replace(/얼마나/g, '')
    .replace(/몇\s*/g, '')
    .replace(/뭐예요/g, '')
    .replace(/뭔가요/g, '')
    .replace(/받나요/g, '')
    .replace(/볼까요/g, '')
    .replace(/해야하나요/g, '')
    .replace(/해야 하나요/g, '')
    .replace(/알아볼까요/g, '')
    .replace(/알아볼게요/g, '')
    .replace(/알아봅니다/g, '')
    .trim();

  // 공백으로 분리 후 의미 있는 단어만
  let words = cleaned.split(/\s+/).filter(w => w.length >= 2);

  // 조사가 붙은 단어 정제 (기간은 → 기간, 조건을 → 조건)
  words = words.map(w => {
    return w
      .replace(/은$/, '')
      .replace(/는$/, '')
      .replace(/을$/, '')
      .replace(/를$/, '')
      .replace(/이$/, '')
      .replace(/가$/, '')
      .replace(/에서$/, '')
      .replace(/에$/, '')
      .replace(/로$/, '')
      .replace(/으로$/, '');
  }).filter(w => w.length >= 2);

  // 복합어 합치기 (묵시적 + 갱신 → 묵시적갱신)
  const compoundWords: Record<string, string> = {
    '묵시적-갱신': '묵시적갱신',
    '계약-갱신': '계약갱신',
    '청구권-행사': '청구권행사',
    '퇴직-연금': '퇴직연금',
    '퇴직-금': '퇴직금',
    '세액-공제': '세액공제',
    '소득-공제': '소득공제',
  };

  // 연속된 두 단어를 합쳐서 체크
  const merged: string[] = [];
  let i = 0;
  while (i < words.length) {
    if (i + 1 < words.length) {
      const pair = `${words[i]}-${words[i + 1]}`;
      if (compoundWords[pair]) {
        merged.push(compoundWords[pair]);
        i += 2;
        continue;
      }
    }
    merged.push(words[i]);
    i++;
  }

  return merged;
}

// ============================================
// 5. 키워드 확장 (1-3개 → 4개 이상)
// ============================================
function expandKeywords(inputKeywords: string[]): string[] {
  const expanded = new Set<string>();

  // 입력 키워드 먼저 추가
  for (const kw of inputKeywords) {
    expanded.add(kw);
  }

  // 복합 키워드 우선 체크 (예: "퇴직금 미지급", "전세 보증금")
  const combinedInput = inputKeywords.join(' ');
  if (KEYWORD_EXPANSION[combinedInput]) {
    for (const related of KEYWORD_EXPANSION[combinedInput].slice(0, 5)) {
      expanded.add(related);
    }
  }

  // 각 입력 키워드에 대해 연관 키워드 추가
  for (const kw of inputKeywords) {
    // 정확히 매칭
    if (KEYWORD_EXPANSION[kw]) {
      for (const related of KEYWORD_EXPANSION[kw].slice(0, 4)) {
        expanded.add(related);
        if (expanded.size >= 7) break;
      }
    }

    // 부분 매칭
    for (const [base, relateds] of Object.entries(KEYWORD_EXPANSION)) {
      if (kw.includes(base) || base.includes(kw)) {
        for (const related of relateds.slice(0, 3)) {
          expanded.add(related);
          if (expanded.size >= 7) break;
        }
        if (expanded.size >= 7) break;
      }
    }
  }

  return Array.from(expanded);
}

// ============================================
// 6. 타이틀 후보 생성 (v5 - 위기브 스타일 완벽 구현)
// ============================================
// 핵심: "및" 앞뒤로 각각 2단어씩 (주제+행동 / 주제+행동)
// "퇴직금 미지급 신고 절차 및 지연이자 청구 방법" ✅
// "IRP 세액공제 한도 및 연말정산 절세 방법" ✅
// "전세 보증금 반환 청구 및 내용증명 작성 방법" ✅
// "실업급여 수급 조건 및 신청 기간 계산" ✅
function generateTitleCandidates(keywords: string[]): string[] {
  const candidates: string[] = [];

  if (keywords.length < 4) {
    return [];
  }

  // 행동어 목록 (확장)
  const actionSet = new Set(['계산', '신청', '청구', '작성', '확인', '조회', '절차', '신고', '받기', '산정', '지급', '사용', '처리', '납부', '환급', '이체', '해지', '수령', '절세']);

  // 키워드 분류
  const actionWords = keywords.filter(k => actionSet.has(k) || ENDINGS.includes(k));
  const contentWords = keywords.filter(k => !actionSet.has(k) && !ENDINGS.includes(k));

  // 명사들 (주제)
  const topic = contentWords[0] || '';      // 퇴직금, IRP, 전세
  const detail1 = contentWords[1] || '';    // 미지급, 세액공제, 보증금
  const detail2 = contentWords[2] || '';    // 지연이자, 한도/연말정산, 반환
  const detail3 = contentWords[3] || '';    // 노동청, 절세, 내용증명
  const detail4 = contentWords[4] || '';    // 추가

  // 행동어들
  const actions = [...new Set(actionWords)].filter(a => a !== '조건' && a !== '기준');
  const action1 = actions[0] || '신청';
  const action2 = actions[1] || '계산';
  const action3 = actions[2] || '확인';

  // "방법" 앞에 행동어가 필요한 단어들
  const needsActionBeforeMethod = (word: string): boolean => {
    const awkwardWithMethod = ['요건', '조건', '자격', '한도', '기간', '기준', '대상', '미사용', '1세대1주택', '거주기간', '연말정산', '절세', '세액공제', '소득공제', '보증금', '지연이자', '평균임금'];
    return awkwardWithMethod.includes(word);
  };

  // ============================================
  // 패턴 1 (최우선): "{주제} {세부1} {행동1} {행동2} 및 {세부2} {행동3} 방법"
  // 예: "퇴직금 미지급 신고 절차 및 지연이자 청구 방법"
  // 가장 완성도 높은 패턴 - 행동어가 2개 이상일 때만 사용
  // ============================================
  if (topic && detail1 && detail2 && actions.length >= 2) {
    candidates.push(`${topic} ${detail1} ${action1} ${action2} 및 ${detail2} ${actions[2] || '청구'} 방법`);
  }

  // ============================================
  // 패턴 2: "{주제} {세부1} {세부2} {행동1} 및 {세부3} {행동2} 방법"
  // 예: "전세 보증금 반환 청구 및 내용증명 작성 방법"
  // 세부3이 행동어와 자연스럽게 연결될 때
  // ============================================
  if (topic && detail1 && detail2 && detail3 && actions.length >= 1) {
    // detail3이 행동어와 어울리는지 체크
    if (!needsActionBeforeMethod(detail3)) {
      candidates.push(`${topic} ${detail1} ${detail2} ${action1} 및 ${detail3} ${action2} 방법`);
    }
  }

  // ============================================
  // 패턴 3: 조건/요건 기반
  // 예: "양도소득세 비과세 요건 및 계산 방법"
  // 예: "실업급여 수급 조건 및 신청 방법"
  // ============================================
  if (topic && detail1 && keywords.some(k => k === '조건' || k === '요건')) {
    const conditionWord = keywords.includes('요건') ? '요건' : '조건';
    candidates.push(`${topic} ${detail1} ${conditionWord} 및 ${action1} 방법`);
  }

  // ============================================
  // 패턴 4: 한도 기반
  // 예: "IRP 세액공제 한도 및 절세 방법"
  // ============================================
  if (topic && detail1 && keywords.includes('한도')) {
    candidates.push(`${topic} ${detail1} 한도 및 ${action1} 방법`);
  }

  // ============================================
  // 패턴 5: 간단한 조건+방법 (기본)
  // 예: "퇴직금 지급 조건 및 계산 방법"
  // ============================================
  if (topic && detail1) {
    candidates.push(`${topic} ${detail1} 조건 및 ${action1} 방법`);
  }

  // ============================================
  // 패턴 6: 총정리 (보조)
  // ============================================
  if (topic && detail1 && detail2 && detail3) {
    candidates.push(`${topic} ${detail1} ${detail2} ${detail3} 총정리`);
  }

  // 중복 제거 및 정리
  return [...new Set(candidates)]
    .map(c => c.replace(/\s+/g, ' ').trim())
    .filter(c => {
      const words = c.split(' ');
      // 최소 5단어, 중복 단어 없음
      const uniqueWords = new Set(words);
      return words.length >= 5 && words.length === uniqueWords.size;
    });
}

// ============================================
// 7. 자연스러움 검증
// ============================================
function validateNaturalness(title: string): { valid: boolean; score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;

  // 1. 조사 체크 (및/와/과)
  const hasConnector = CONNECTORS.some(c => title.includes(c));
  if (!hasConnector) {
    issues.push('조사(및/와/과) 없음');
    score -= 30;
  }

  // 2. 종결어 체크
  const hasEnding = ENDINGS.some(e => title.endsWith(e));
  if (!hasEnding) {
    issues.push('자연스러운 종결어 없음');
    score -= 20;
  }

  // 3. 키워드 개수 체크 (공백 기준) - 최소 5개
  const wordCount = title.split(/\s+/).length;
  if (wordCount < 5) {
    issues.push(`키워드 ${wordCount}개 (최소 5개 필요)`);
    score -= 25;
  }

  // 4. 어색한 숫자 패턴 체크
  if (/\d+일\s+[가-힣]+/.test(title) && !title.includes('기한') && !title.includes('기간')) {
    issues.push('숫자 배치 어색함');
    score -= 15;
  }

  // 5. 중복 단어 체크
  const words = title.split(/\s+/);
  const uniqueWords = new Set(words);
  if (words.length !== uniqueWords.size) {
    issues.push('중복 단어 있음');
    score -= 20;
  }

  // 6. 길이 체크
  if (title.length > 35) {
    issues.push('타이틀 너무 김 (35자 초과)');
    score -= 10;
  }

  // 7. "방법" 중복 체크
  const methodCount = (title.match(/방법/g) || []).length;
  if (methodCount > 1) {
    issues.push('"방법" 중복');
    score -= 15;
  }

  return {
    valid: score >= 70,
    score,
    issues
  };
}

// ============================================
// 8. 중복 체크
// ============================================
function checkDuplicate(title: string, existingTitles: string[]): { isDuplicate: boolean; similar: string[] } {
  const similar: string[] = [];

  // 정확히 일치
  if (existingTitles.includes(title)) {
    return { isDuplicate: true, similar: [title] };
  }

  // 유사도 체크 (80% 이상 유사하면 중복으로 판단 - 느슨하게)
  const titleWords = new Set(title.split(/\s+/).filter(w => !CONNECTORS.includes(w) && w.length >= 2));

  for (const existing of existingTitles) {
    const existingWords = new Set(existing.split(/\s+/).filter(w => !CONNECTORS.includes(w) && w.length >= 2));
    const intersection = [...titleWords].filter(w => existingWords.has(w));
    const similarity = intersection.length / Math.max(titleWords.size, existingWords.size);

    // 80% 이상 유사할 때만 중복 (단어 4개 겹침 조건 삭제 - 너무 엄격)
    if (similarity >= 0.8) {
      similar.push(existing);
    }
  }

  return {
    isDuplicate: similar.length > 0,
    similar: similar.slice(0, 3) // 최대 3개만
  };
}

// ============================================
// 9. 슬러그 생성
// ============================================
function createSlug(title: string): string {
  return title
    .replace(/\s+/g, '-')
    .replace(/[및와과]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ============================================
// 10. 최적 타이틀 선택
// ============================================
function selectBestTitle(
  candidates: string[],
  existingTitles: string[]
): TitleResult | null {

  // 점수순 정렬, 같은 점수면 원래 순서 유지 (첫 번째가 더 좋음)
  const scored = candidates.map((candidate, index) => {
    const naturalness = validateNaturalness(candidate);
    const duplicate = checkDuplicate(candidate, existingTitles);
    return {
      candidate,
      score: naturalness.valid && !duplicate.isDuplicate ? naturalness.score : 0,
      originalIndex: index
    };
  });

  // 점수 내림차순 정렬, 같은 점수면 원래 순서 유지
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.originalIndex - b.originalIndex;
  });

  const best = scored.find(s => s.score > 0);
  if (!best) return null;

  const keywords = best.candidate.split(/\s+/).filter(w =>
    !CONNECTORS.includes(w) && w.length >= 2
  );

  const slug = createSlug(best.candidate);

  return {
    title: best.candidate,
    keywords: keywords.slice(0, 5),
    slug,
    filename: `${slug}.md`,
    score: best.score
  };
}

// ============================================
// 11. 메인 함수
// ============================================
function main() {
  const input = process.argv[2];

  if (!input) {
    console.log(`
위키 타이틀 생성기 v2.0

사용법:
  npx tsx scripts/generate-wiki-title.ts "키워드"
  npx tsx scripts/generate-wiki-title.ts "PAA 질문"

예시:
  npx tsx scripts/generate-wiki-title.ts "퇴직금"
  npx tsx scripts/generate-wiki-title.ts "퇴직금 계산"
  npx tsx scripts/generate-wiki-title.ts "묵시적 갱신 기간은 어떻게 계산하나요?"
  npx tsx scripts/generate-wiki-title.ts "IRP 세액공제"
`);
    process.exit(1);
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('  위키 타이틀 생성기 v2.0');
  console.log('='.repeat(60));
  console.log('');

  // 1. 기존 타이틀 로드
  console.log('[1/5] 기존 위키 타이틀 로드 중...');
  const existingTitles = loadExistingTitles();
  console.log(`      → ${existingTitles.length}개 타이틀 로드됨`);
  console.log('');

  // 2. 입력 분석
  console.log(`[2/5] 입력 분석: "${input}"`);

  let inputKeywords: string[];

  // PAA 질문인지 확인
  if (input.includes('?') || input.includes('어떻게') || input.includes('무엇') || input.includes('얼마')) {
    console.log('      → PAA 질문 형태 감지');
    inputKeywords = extractKeywordsFromPAA(input);
  } else {
    inputKeywords = input.split(/\s+/).filter(w => w.length >= 2);
  }

  console.log(`      → 추출된 키워드: [${inputKeywords.join(', ')}]`);
  console.log('');

  // 3. 키워드 확장
  console.log('[3/5] 키워드 확장 중...');
  const expandedKeywords = expandKeywords(inputKeywords);
  console.log(`      → 확장된 키워드: [${expandedKeywords.join(', ')}]`);
  console.log('');

  // 4. 키워드 개수 체크
  if (expandedKeywords.length < 4) {
    console.log('');
    console.log('❌ 오류: 키워드를 4개 이상으로 확장할 수 없습니다.');
    console.log('   → 더 구체적인 키워드를 입력해주세요.');
    console.log('');
    console.log('💡 예시:');
    console.log('   - "퇴직금" → "퇴직금 계산" 또는 "퇴직금 지급"');
    console.log('   - "연말정산" → "연말정산 공제" 또는 "연말정산 신용카드"');
    process.exit(1);
  }

  // 5. 타이틀 후보 생성
  console.log('[4/5] 타이틀 후보 생성 중...');
  const candidates = generateTitleCandidates(expandedKeywords);
  console.log(`      → ${candidates.length}개 후보 생성됨`);
  console.log('');

  // 6. 최적 타이틀 선택
  console.log('[5/5] 최적 타이틀 선택 중...');
  const result = selectBestTitle(candidates, existingTitles);

  if (!result) {
    console.log('');
    console.log('❌ 오류: 적합한 타이틀을 생성할 수 없습니다.');
    console.log('');

    // 후보 중 중복된 것 표시
    console.log('📋 생성된 후보들 (중복 또는 부적합):');
    for (const candidate of candidates.slice(0, 5)) {
      const dup = checkDuplicate(candidate, existingTitles);
      const nat = validateNaturalness(candidate);

      if (dup.isDuplicate) {
        console.log(`   ❌ "${candidate}"`);
        console.log(`      → 유사: "${dup.similar[0]}"`);
      } else if (!nat.valid) {
        console.log(`   ⚠️ "${candidate}"`);
        console.log(`      → 문제: ${nat.issues.join(', ')}`);
      }
    }

    console.log('');
    console.log('💡 제안: 다른 키워드 조합을 시도해보세요.');
    process.exit(1);
  }

  // 7. 결과 출력
  console.log('');
  console.log('='.repeat(60));
  console.log('  결과');
  console.log('='.repeat(60));
  console.log('');
  console.log(`✅ 타이틀: "${result.title}"`);
  console.log(`✅ 키워드 ${result.keywords.length}개: [${result.keywords.join(', ')}]`);
  console.log(`✅ 자연스러움 점수: ${result.score}/100`);
  console.log(`✅ 기존 글 중복: 없음`);
  console.log('');
  console.log(`📁 파일명: ${result.filename}`);
  console.log(`🔗 슬러그: /w/${result.slug}`);
  console.log('');

  // 8. frontmatter 제안
  console.log('📝 frontmatter 제안:');
  console.log('```yaml');
  console.log(`title: "${result.title}"`);
  console.log(`keywords: [${result.keywords.map(k => `"${k}"`).join(', ')}]`);
  console.log('```');
  console.log('');
}

main();
