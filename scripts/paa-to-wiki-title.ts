#!/usr/bin/env npx tsx
/**
 * PAA 질문 → 위키 타이틀 변환 스크립트 (콜론 패턴)
 *
 * 사용법:
 *   npx tsx scripts/paa-to-wiki-title.ts "묵시적 갱신 후 해지할 수 있나요?"
 *   npx tsx scripts/paa-to-wiki-title.ts --batch paa-questions.txt
 *   npx tsx scripts/paa-to-wiki-title.ts --check "타이틀" (중복 검사만)
 *
 * 타이틀 패턴 (콜론 스타일, 23-28자):
 *   "주제: 핵심내용과 부가내용"
 *   예) "묵시적 갱신 후 법률 관계: 계약 기간 및 임차인 해지 권리"
 */

import * as fs from 'fs';
import * as path from 'path';

// ============================================
// 1. 카테고리 자동 분류
// ============================================
// 카테고리 우선순위: 더 구체적인 것부터 체크 (근로/노동이 부동산보다 먼저)
const CATEGORY_KEYWORDS: [string, string[]][] = [
  ['근로/노동', ['퇴직금', '근로', '연차', '수당', '해고', '임금', '급여', '노동', '출근', '미출근', '근로계약', '계약서', '근무', '휴가', '휴직']],
  ['세금', ['세금', '세액공제', '소득공제', '연말정산', '양도세', '취득세', '증여세', '상속세', '부가세', '종소세']],
  ['고용', ['실업급여', '고용보험', '출산휴가', '육아휴직', '산재', '4대보험']],
  ['금융', ['대출', '이자', '금리', '예금', '적금', 'IRP', '연금', '청약']],
  ['복지', ['지원금', '바우처', '복지', '보조금']],
  ['부동산', ['전세', '월세', '임대', '임차', '보증금', '계약', '갱신', '묵시적', '중개', '매매', '등기', '확정일자', '전입신고', '상가', '주택']],
];

function detectCategory(text: string): string {
  for (const [category, keywords] of CATEGORY_KEYWORDS) {
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
  const cleaned = question.replace(/[?？!！.,，。·\-_]/g, ' ').replace(/\s+/g, ' ').trim();
  const words = cleaned.split(' ').filter(w => w.length >= 2);
  const filtered = words.filter(w => !STOPWORDS.includes(w));
  const scored = filtered.map(w => ({
    word: w,
    score: ACTION_WORDS.includes(w) ? 10 : (ENDINGS.includes(w) ? 5 : 1)
  }));
  scored.sort((a, b) => b.score - a.score);
  return [...new Set(scored.map(s => s.word))];
}

// ============================================
// 3. 조사 처리 헬퍼
// ============================================
function removeParticles(word: string): string {
  return word
    .replace(/을$|를$|이$|가$|은$|는$|에$|에서$|으로$|로$|와$|과$|의$|도$|만$|까지$|부터$|에게$|한테$|께$/g, '')
    .replace(/할$|하는$|하면$|해서$/g, '');
}

// 받침에 따라 "과/와" 선택
function getConnector(word: string): '과' | '와' {
  if (!word || word.length === 0) return '과';
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);
  // 한글 범위 확인
  if (code < 0xAC00 || code > 0xD7A3) return '과';
  // 종성(받침) 확인: (code - 0xAC00) % 28 === 0 이면 받침 없음
  const hasBatchim = (code - 0xAC00) % 28 !== 0;
  return hasBatchim ? '과' : '와';
}

// ============================================
// 4. PAA 질문에서 핵심 요소 추출
// ============================================
interface QuestionElements {
  주제: string;
  행동: string;
  대상?: string;
  기간?: string;
  항목1?: string;
  항목2?: string;
}

function extractQuestionElements(question: string): QuestionElements {
  const cleaned = question.replace(/[?？!！.,，。]/g, '').trim();

  // 기간 추출
  const periodMatch = cleaned.match(/(\d+\s*(개월|년|일|주))/);
  const 기간 = periodMatch ? periodMatch[1] : undefined;

  // 비교 항목 추출
  const compareMatch = cleaned.match(/(.+?)[와과]\s*(.+?)\s*(차이|비교|다른)/);

  const words = cleaned.split(' ').filter(w => w.length >= 2);

  // 핵심 주제어 찾기
  const topicKeywords = ['묵시적', '계약갱신청구권', '계약갱신', '계약', '갱신', '해지', '전세', '월세', '임대', '임차',
    '퇴직', '연말정산', '청약', '대출', '중개수수료', '중개보수', '보증금', '상가임대차', '근로계약'];

  let 주제Words: string[] = [];
  for (const word of words) {
    const cleanWord = removeParticles(word);
    if (topicKeywords.some(k => cleanWord.includes(k))) {
      주제Words.push(cleanWord);
      if (주제Words.length >= 2) break;
    }
  }

  if (주제Words.length === 0) {
    주제Words = words.slice(0, 2).map(removeParticles);
  }

  let 주제 = 주제Words.join(' ');

  // 행동어 추출
  const actionKeywords = ['해지', '신청', '갱신', '청구', '계산', '확인', '조회', '발급', '중도해지', '철회', '취소', '변경', '부담', '출근', '미출근'];
  let 행동 = '';

  for (const word of words) {
    const cleanWord = removeParticles(word);
    for (const action of actionKeywords) {
      if (cleanWord.includes(action) && !주제.includes(action)) {
        행동 = action;
        break;
      }
    }
    if (행동) break;
  }

  if (!행동) {
    const verbMatch = cleaned.match(/(해지|신청|갱신|청구|계산|조회|발급|철회|취소|변경|부담|미출근|출근)/);
    행동 = verbMatch ? verbMatch[1] : '';
  }

  // 대상 추출 (임대인, 임차인, 등)
  const targetMatch = cleaned.match(/(임대인|임차인|집주인|세입자)/);
  const 대상 = targetMatch ? targetMatch[1] : undefined;

  return {
    주제: 주제.trim(),
    행동: 행동 || '확인',
    대상,
    기간,
    항목1: compareMatch ? removeParticles(compareMatch[1].trim()) : undefined,
    항목2: compareMatch ? removeParticles(compareMatch[2].trim()) : undefined,
  };
}

// ============================================
// 5. 콜론(:) 스타일 타이틀 생성
// ============================================

// 질문 유형 감지
type QuestionType = 'possibility' | 'comparison' | 'time' | 'condition' | 'cost' | 'action';

function detectQuestionType(question: string): QuestionType {
  if (question.includes('있나요') || question.includes('가능') || question.includes('되나요') || question.includes('할 수')) {
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
  if (question.includes('부담') || question.includes('비용') || question.includes('얼마') || question.includes('수수료')) {
    return 'cost';
  }
  return 'action';
}

function generateWikiTitle(question: string): string {
  const questionType = detectQuestionType(question);
  const el = extractQuestionElements(question);

  // 콜론(:) 패턴으로 타이틀 생성 (23-28자 목표)
  let title = '';

  // 특수 케이스 먼저 처리 (하드코딩된 좋은 예시들)

  // 1. 근로계약 + 출근 안함
  if (question.includes('근로계약') && (question.includes('출근 안') || question.includes('안하면') || question.includes('미출근'))) {
    return '근로계약 체결 후 미출근: 법적 책임과 손해배상';
  }

  // 2. 중개수수료/중개보수 부담
  if (question.includes('중개수수료') || question.includes('중개보수')) {
    return '부동산 중개보수 부담 주체: 임대인과 임차인 부담 기준';
  }

  // 3. 묵시적 갱신 지나면/후
  if ((question.includes('묵시적') || question.includes('묵시적갱신')) && (question.includes('지나면') || question.includes('후'))) {
    return '묵시적 갱신 후 법률 관계: 계약 기간과 임차인 해지 권리';
  }

  // 4. 상가임대차 갱신 후 해지
  if (question.includes('상가') && question.includes('갱신') && question.includes('해지')) {
    return '상가임대차 갱신 계약의 중도 해지: 가능 여부와 위약금';
  }

  // 5. 계약갱신청구권 vs 묵시적 갱신 차이
  if (question.includes('계약갱신청구권') && question.includes('묵시적') && question.includes('차이')) {
    return '계약갱신청구권과 묵시적 갱신의 차이: 법적 효력과 유불리 비교';
  }

  // 6. 퇴직금 계산 (평균임금, 근속연수)
  if (question.includes('퇴직금') && question.includes('계산')) {
    return '퇴직금 평균임금 산정 및 근속연수 계산 방법';
  }

  // 7. 퇴직연금 해지 (중도 해지, 세금)
  if (question.includes('퇴직연금') && question.includes('해지')) {
    return '퇴직연금 중도 해지: 절차와 세금 부담';
  }

  // 8. 퇴직금 IRP (이전, 세액공제)
  if (question.includes('퇴직금') && (question.includes('IRP') || question.includes('irp') || question.includes('이전'))) {
    return '퇴직금 IRP 이전: 의무 가입과 세액공제 혜택';
  }

  // 9. 퇴직금 미지급 (신고, 지연이자)
  if (question.includes('퇴직금') && (question.includes('미지급') || question.includes('안') || question.includes('못'))) {
    return '퇴직금 미지급 신고: 절차와 지연이자 청구 방법';
  }

  // 16. 퇴직연금 DB DC 차이 (우선순위: 수령보다 먼저 체크)
  if (question.includes('퇴직연금') && (question.includes('DB') || question.includes('DC')) && (question.includes('차이') || question.includes('비교'))) {
    return '퇴직연금 DB형과 DC형 차이: 수령액과 운용 비교';
  }

  // 14. 퇴직연금 중도인출 (수령보다 구체적)
  if (question.includes('퇴직연금') && (question.includes('중도인출') || question.includes('인출'))) {
    return '퇴직연금 중도인출: 조건과 사유 신청 방법';
  }

  // 24. 퇴직연금 ETF (수령보다 구체적)
  if (question.includes('퇴직연금') && question.includes('ETF')) {
    return '퇴직연금 ETF 추천: 안전자산과 배당 상품';
  }

  // 23. 퇴직연금 운용 (수령보다 구체적)
  if (question.includes('퇴직연금') && (question.includes('운용') || question.includes('투자'))) {
    return '퇴직연금 운용 방법: ETF와 펀드 선택 전략';
  }

  // 25. 퇴직연금 수령 나이 (수령보다 구체적)
  if (question.includes('퇴직연금') && (question.includes('나이') || question.includes('55세'))) {
    return '퇴직연금 수령 나이: 55세 기준과 조기 수령';
  }

  // 10. 퇴직연금 수령 (일시금, 연금) - 일반 케이스
  if (question.includes('퇴직연금') && (question.includes('수령') || question.includes('받') || question.includes('일시금') || question.includes('연금'))) {
    return '퇴직연금 수령 방법: 일시금과 연금 비교';
  }

  // 11. 퇴직금 평균임금 (산정 기준)
  if (question.includes('평균임금') || (question.includes('퇴직금') && question.includes('임금'))) {
    return '퇴직금 평균임금 산정: 3개월 임금과 계산 기준';
  }

  // 12. IRP 세액공제 (연말정산)
  if (question.includes('IRP') && (question.includes('세액공제') || question.includes('공제'))) {
    return 'IRP 세액공제 한도: 연말정산 절세 방법';
  }

  // 13. 퇴직금 중간정산
  if (question.includes('퇴직금') && (question.includes('중간정산') || question.includes('중간'))) {
    return '퇴직금 중간정산 신청: 법정 사유와 절차';
  }

  // 15. 퇴직소득세
  if (question.includes('퇴직소득세') || (question.includes('퇴직') && question.includes('소득세'))) {
    return '퇴직소득세 세율 계산: 근속연수별 공제 및 환급';
  }

  // 17. 1년 미만 퇴직금
  if (question.includes('퇴직금') && (question.includes('1년') || question.includes('일년') || question.includes('미만'))) {
    return '1년 미만 퇴직금: 지급 규정과 조건 기준';
  }

  // 18. 회사 폐업 퇴직금
  if (question.includes('퇴직금') && (question.includes('폐업') || question.includes('망') || question.includes('도산') || question.includes('파산'))) {
    return '회사 폐업 시 퇴직금: 체당금 신청과 우선변제권';
  }

  // 19. DB형 수령
  if (question.includes('DB') && (question.includes('수령') || question.includes('받'))) {
    return 'DB형 퇴직연금 수령: 방법과 세금 계산';
  }

  // 20. DC형 수령
  if (question.includes('DC') && (question.includes('수령') || question.includes('받'))) {
    return 'DC형 퇴직연금 수령: 방법과 운용수익 포함';
  }

  // 21. 퇴직금 지급 기한
  if (question.includes('퇴직금') && (question.includes('기한') || question.includes('14일') || question.includes('언제'))) {
    return '퇴직금 지급 기한: 14일 원칙과 지연이자';
  }

  // 22. 근속연수
  if (question.includes('근속연수') || (question.includes('근속') && question.includes('연수'))) {
    return '퇴직금 근속연수 계산: 1년 미만과 재직 기간';
  }

  // 일반 케이스
  switch (questionType) {
    case 'possibility':
      if (el.기간) {
        title = `${el.주제} ${el.기간} 후 ${el.행동}: 가능 여부${el.대상 ? `와 ${el.대상} 권리` : '와 절차'}`;
      } else {
        title = `${el.주제} ${el.행동}: 가능 여부${el.대상 ? `와 ${el.대상} 권리` : '와 절차'}`;
      }
      break;

    case 'comparison':
      if (el.항목1 && el.항목2) {
        const conn = getConnector(el.항목1);
        title = `${el.항목1}${conn} ${el.항목2}의 차이: 법적 효력과 유불리 비교`;
      } else {
        title = `${el.주제} 비교: 차이점과 선택 기준`;
      }
      break;

    case 'time':
      title = `${el.주제} 후 법률 관계: 계약 기간${el.대상 ? `과 ${el.대상} ${el.행동} 권리` : '과 효력'}`;
      break;

    case 'cost':
      title = `${el.주제} 비용: 부담 주체와 계산 기준`;
      break;

    case 'condition':
      title = `${el.주제} ${el.행동} 조건: 자격 요건과 신청 방법`;
      break;

    case 'action':
    default:
      title = `${el.주제} ${el.행동}: 방법${el.대상 ? `과 ${el.대상} 권리` : '과 절차'}`;
      break;
  }

  // 정리: 이중 공백, 이중 콜론 제거
  title = title
    .replace(/\s+/g, ' ')
    .replace(/::/g, ':')
    .replace(/\s+:/g, ':')
    .replace(/:\s+/g, ': ')
    .trim();

  return title;
}

// ============================================
// 6. 4개 키워드 생성 (SEO 최적화)
// ============================================
const KEYWORD_BLACKLIST = [
  '있나요', '없나요', '되나요', '인가요', '하나요', '할까요', '일까요', '건가요',
  '있지', '없지', '되지', '인지', '하지', '할지', '일지',
  '뭔가요', '뭘까요', '어떻게', '어떤가요',
  '알고', '모르고', '싶어요', '원해요', '궁금해요',
  '가능', '불가능', '여부', '총정리', '완벽', '가이드',
];

function generate4Keywords(title: string, question: string): string[] {
  // 특수 케이스 (예시 기반 하드코딩)

  // 1. 근로계약 + 출근 안함
  if (question.includes('근로계약') && (question.includes('출근 안') || question.includes('안하면') || question.includes('미출근'))) {
    return ['근로계약 미출근', '미출근 손해배상', '근로계약 파기', '출근 전 퇴사'];
  }

  // 2. 중개수수료/중개보수
  if (question.includes('중개수수료') || question.includes('중개보수')) {
    return ['부동산 중개수수료', '중개수수료 임차인', '중개보수 부담', '묵시적 갱신 중개수수료'];
  }

  // 3. 묵시적 갱신 지나면/후
  if ((question.includes('묵시적') || question.includes('묵시적갱신')) && (question.includes('지나면') || question.includes('후'))) {
    return ['묵시적 갱신', '묵시적 갱신 후 계약해지', '묵시적 갱신 기간', '임차인 계약해지'];
  }

  // 4. 상가임대차 갱신 후 해지
  if (question.includes('상가') && question.includes('갱신') && question.includes('해지')) {
    return ['상가 계약해지', '상가 갱신 계약 해지', '상가 중도해지 위약금', '임차인 중도해지'];
  }

  // 5. 계약갱신청구권 vs 묵시적 갱신 차이
  if (question.includes('계약갱신청구권') && question.includes('묵시적') && question.includes('차이')) {
    return ['계약갱신청구권 묵시적갱신', '계약갱신청구권 차이', '묵시적갱신 보증금', '5%룰'];
  }

  // 6. 퇴직금 계산
  if (question.includes('퇴직금') && question.includes('계산')) {
    return ['퇴직금 계산', '퇴직금 평균임금', '퇴직금 근속연수', '퇴직금 계산법'];
  }

  // 7. 퇴직연금 해지
  if (question.includes('퇴직연금') && question.includes('해지')) {
    return ['퇴직연금 해지', '퇴직연금 해지 세금', '퇴직연금 중도해지', 'DC형 해지'];
  }

  // 8. 퇴직금 IRP
  if (question.includes('퇴직금') && (question.includes('IRP') || question.includes('irp') || question.includes('이전'))) {
    return ['퇴직금 IRP', 'IRP 이전', 'IRP 의무가입', 'IRP 세액공제'];
  }

  // 9. 퇴직금 미지급
  if (question.includes('퇴직금') && (question.includes('미지급') || question.includes('안') || question.includes('못'))) {
    return ['퇴직금 미지급', '퇴직금 미지급 신고', '퇴직금 지연이자', '퇴직금 체불'];
  }

  // 16. 퇴직연금 DB DC 차이 (우선순위)
  if (question.includes('퇴직연금') && (question.includes('DB') || question.includes('DC')) && (question.includes('차이') || question.includes('비교'))) {
    return ['퇴직연금 DB DC', 'DB형 DC형 차이', '퇴직연금 종류', 'DB DC 비교'];
  }

  // 10. 퇴직연금 수령
  if (question.includes('퇴직연금') && (question.includes('수령') || question.includes('받') || question.includes('일시금') || question.includes('연금'))) {
    return ['퇴직연금 수령', '퇴직연금 일시금', '퇴직연금 연금', 'DB형 수령'];
  }

  // 11. 퇴직금 평균임금
  if (question.includes('평균임금') || (question.includes('퇴직금') && question.includes('임금'))) {
    return ['퇴직금 평균임금', '평균임금 산정', '퇴직금 3개월', '평균임금 계산'];
  }

  // 12. IRP 세액공제
  if (question.includes('IRP') && (question.includes('세액공제') || question.includes('공제'))) {
    return ['IRP 세액공제', 'IRP 세액공제 한도', 'IRP 연말정산', 'IRP 900만원'];
  }

  // 13. 퇴직금 중간정산
  if (question.includes('퇴직금') && (question.includes('중간정산') || question.includes('중간'))) {
    return ['퇴직금 중간정산', '중간정산 사유', '퇴직금 중간정산 신청', '중간정산 조건'];
  }

  // 14. 퇴직연금 중도인출
  if (question.includes('퇴직연금') && (question.includes('중도인출') || question.includes('인출'))) {
    return ['퇴직연금 중도인출', '중도인출 사유', '퇴직연금 인출 조건', '주택구입 중도인출'];
  }

  // 15. 퇴직소득세
  if (question.includes('퇴직소득세') || (question.includes('퇴직') && question.includes('소득세'))) {
    return ['퇴직소득세', '퇴직소득세 계산', '퇴직소득세 세율', '퇴직금 세금'];
  }

  // 17. 1년 미만 퇴직금
  if (question.includes('퇴직금') && (question.includes('1년') || question.includes('일년') || question.includes('미만'))) {
    return ['1년 미만 퇴직금', '퇴직금 지급 조건', '1년 미만 퇴사', '퇴직금 자격'];
  }

  // 18. 회사 폐업 퇴직금
  if (question.includes('퇴직금') && (question.includes('폐업') || question.includes('망') || question.includes('도산') || question.includes('파산'))) {
    return ['회사 폐업 퇴직금', '퇴직금 체당금', '회사 도산 퇴직금', '우선변제권'];
  }

  // 19. DB형 수령
  if (question.includes('DB') && (question.includes('수령') || question.includes('받'))) {
    return ['DB형 수령', 'DB형 퇴직연금', 'DB형 수령 방법', 'DB형 세금'];
  }

  // 20. DC형 수령
  if (question.includes('DC') && (question.includes('수령') || question.includes('받'))) {
    return ['DC형 수령', 'DC형 퇴직연금', 'DC형 수령 방법', 'DC형 운용수익'];
  }

  // 21. 퇴직금 지급 기한
  if (question.includes('퇴직금') && (question.includes('기한') || question.includes('14일') || question.includes('언제'))) {
    return ['퇴직금 지급 기한', '퇴직금 14일', '퇴직금 지급일', '퇴직금 언제'];
  }

  // 22. 근속연수
  if (question.includes('근속연수') || (question.includes('근속') && question.includes('연수'))) {
    return ['근속연수', '근속연수 계산', '퇴직금 근속', '재직 기간'];
  }

  // 23. 퇴직연금 운용
  if (question.includes('퇴직연금') && (question.includes('운용') || question.includes('투자'))) {
    return ['퇴직연금 운용', '퇴직연금 투자', '퇴직연금 운용 방법', '퇴직연금 상품'];
  }

  // 24. 퇴직연금 ETF
  if (question.includes('퇴직연금') && question.includes('ETF')) {
    return ['퇴직연금 ETF', '퇴직연금 ETF 추천', '안전자산 ETF', '배당 ETF'];
  }

  // 25. 퇴직연금 수령 나이
  if (question.includes('퇴직연금') && (question.includes('나이') || question.includes('55세'))) {
    return ['퇴직연금 수령 나이', '퇴직연금 55세', '조기 수령', '퇴직연금 언제'];
  }

  // 일반 케이스
  const [mainPart, subPart] = title.split(':').map(s => s?.trim() || '');

  const mainWords = mainPart.split(' ').filter(w =>
    w.length >= 2 &&
    !['의', '와', '과', '후', '시', '때', '및'].includes(w) &&
    !KEYWORD_BLACKLIST.some(bl => w.includes(bl))
  );

  const subWords = subPart ? subPart.split(' ').filter(w =>
    w.length >= 2 &&
    !['의', '와', '과', '후', '시', '때', '및'].includes(w) &&
    !KEYWORD_BLACKLIST.some(bl => w.includes(bl))
  ) : [];

  const questionWords = extractKeywords(question).filter(w =>
    !KEYWORD_BLACKLIST.some(bl => w.includes(bl)) &&
    !w.endsWith('요') &&
    !w.endsWith('지') &&
    w.length >= 2
  );

  const keywords: string[] = [];

  // 1. 메인 키워드 (첫 2단어 조합)
  if (mainWords.length >= 2) {
    keywords.push(mainWords.slice(0, 2).join(' '));
  }

  // 2. 메인 + 행동어
  const action = [...mainWords, ...subWords].find(w => ACTION_WORDS.includes(w) || ENDINGS.includes(w));
  if (action && mainWords[0] && !keywords[0]?.includes(action)) {
    keywords.push(`${mainWords[0]} ${action}`);
  }

  // 3. 서브파트 키워드
  if (subWords.length >= 2) {
    keywords.push(subWords.slice(0, 2).join(' '));
  }

  // 4. 질문에서 추출한 키워드
  if (questionWords.length >= 2) {
    const qkw = questionWords.slice(0, 2).join(' ');
    if (!keywords.includes(qkw)) {
      keywords.push(qkw);
    }
  }

  // 중복 제거
  let unique = [...new Set(keywords)].filter(k => k.trim().length > 0);

  // 4개 미만이면 단일 단어로 채우기
  let idx = 0;
  const allWords = [...mainWords, ...subWords, ...questionWords];
  while (unique.length < 4 && idx < allWords.length) {
    const word = allWords[idx];
    if (word && !unique.some(k => k.includes(word)) && word.length >= 2) {
      unique.push(word);
    }
    idx++;
  }

  // 최종 검증
  unique = unique.filter(k => !KEYWORD_BLACKLIST.some(bl => k.includes(bl)));

  return unique.slice(0, 4);
}

// ============================================
// 7. 기존 위키 파일 중복 검사
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
  const newWords = new Set(newTitle.split(' ').filter(w => w.length >= 2 && !['및', '의', '와', '과', ':'].includes(w)));

  for (const [existingTitle, filename] of existingTitles) {
    const existingWords = new Set(existingTitle.split(' ').filter(w => w.length >= 2 && !['및', '의', '와', '과', ':'].includes(w)));
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
// 8. description 생성 (wegive 스타일)
// ============================================
function generateDescription(question: string, title: string): string {
  // 특수 케이스 먼저 (예시 기반)

  // 1. 근로계약 + 출근 안함
  if (question.includes('근로계약') && (question.includes('출근 안') || question.includes('안하면') || question.includes('미출근'))) {
    return '근로계약서 쓰고 출근 안 하면 손해배상 청구될 수 있어요. 발생 가능한 법적 문제와 대응 방법을 알려드려요.';
  }

  // 2. 중개수수료/중개보수
  if (question.includes('중개수수료') || question.includes('중개보수')) {
    return '이사할 때 중개수수료 누가 내야 할지 헷갈리시죠? 계약 종류와 기간에 따른 중개보수 부담 기준을 명확히 알려드려요.';
  }

  // 3. 묵시적 갱신 지나면/후
  if ((question.includes('묵시적') || question.includes('묵시적갱신')) && (question.includes('지나면') || question.includes('후'))) {
    return '묵시적 갱신이 되면 계약이 어떻게 바뀌는지 알려드려요. 임차인은 언제든 계약을 해지할 수 있고, 3개월 뒤 보증금을 돌려받을 수 있어요.';
  }

  // 4. 상가임대차 갱신 후 해지
  if (question.includes('상가') && question.includes('갱신') && question.includes('해지')) {
    return '상가 계약을 갱신했는데 중간에 나가야 하나요? 임차인이 중도 해지 가능한 경우와 위약금 발생 기준에 대해 알려드려요.';
  }

  // 5. 계약갱신청구권 vs 묵시적 갱신 차이
  if (question.includes('계약갱신청구권') && question.includes('묵시적') && question.includes('차이')) {
    return '계약갱신청구권과 묵시적 갱신, 뭐가 다른지 헷갈리시죠? 보증금 5% 인상, 사용 횟수 등 핵심 차이점을 비교해 드려요.';
  }

  // 6. 퇴직금 계산
  if (question.includes('퇴직금') && question.includes('계산')) {
    return '퇴직금 얼마 받을 수 있는지 궁금하시죠? 평균임금 산정 방법과 근속연수 계산법을 쉽게 알려드려요.';
  }

  // 7. 퇴직연금 해지
  if (question.includes('퇴직연금') && question.includes('해지')) {
    return '퇴직연금 해지하면 세금은 얼마나 나올까요? DB형, DC형, IRP 해지 절차와 주의사항까지 정리했어요.';
  }

  // 8. 퇴직금 IRP
  if (question.includes('퇴직금') && (question.includes('IRP') || question.includes('irp') || question.includes('이전'))) {
    return '퇴직금을 IRP로 옮기면 세액공제 받을 수 있어요. 의무 가입 대상과 세액공제 한도를 알려드려요.';
  }

  // 9. 퇴직금 미지급
  if (question.includes('퇴직금') && (question.includes('미지급') || question.includes('안') || question.includes('못'))) {
    return '퇴직금 안 주면 어떻게 해야 할까요? 고용노동부 신고 절차와 연 20% 지연이자 청구 방법을 알려드려요.';
  }

  // 16. 퇴직연금 DB DC 차이 (우선순위)
  if (question.includes('퇴직연금') && (question.includes('DB') || question.includes('DC')) && (question.includes('차이') || question.includes('비교'))) {
    return 'DB형과 DC형 퇴직연금 차이점 알려드려요. 수령액과 운용 방법이 다르니 어떤 게 유리한지 비교해드릴게요.';
  }

  // 10. 퇴직연금 수령
  if (question.includes('퇴직연금') && (question.includes('수령') || question.includes('받') || question.includes('일시금') || question.includes('연금'))) {
    return '퇴직연금, 일시금으로 받을까 연금으로 받을까 고민되시죠? 세금 차이와 수령 방법을 비교해 드려요.';
  }

  // 11. 퇴직금 평균임금
  if (question.includes('평균임금') || (question.includes('퇴직금') && question.includes('임금'))) {
    return '퇴직금 계산의 핵심은 평균임금이에요. 3개월 임금 기준과 상여금 포함 여부를 자세히 알려드려요.';
  }

  // 12. IRP 세액공제
  if (question.includes('IRP') && (question.includes('세액공제') || question.includes('공제'))) {
    return 'IRP로 연말정산 절세하는 방법, 궁금하시죠? 세액공제 한도 900만원과 환급액 계산법을 알려드려요.';
  }

  // 13. 퇴직금 중간정산
  if (question.includes('퇴직금') && (question.includes('중간정산') || question.includes('중간'))) {
    return '퇴직 전에 퇴직금 미리 받을 수 있을까요? 법정 사유가 있으면 중간정산 가능해요. 신청 절차를 알려드려요.';
  }

  // 14. 퇴직연금 중도인출
  if (question.includes('퇴직연금') && (question.includes('중도인출') || question.includes('인출'))) {
    return '퇴직연금 중도인출 사유와 방법 알려드려요. 주택구입, 의료비 등 법정 사유가 있어야 해요.';
  }

  // 15. 퇴직소득세
  if (question.includes('퇴직소득세') || (question.includes('퇴직') && question.includes('소득세'))) {
    return '퇴직소득세는 퇴직금에 붙는 세금인데 일반 소득세보다 훨씬 낮아요. 근속연수가 길수록 공제가 커져서 더 적게 내요.';
  }

  // 17. 1년 미만 퇴직금
  if (question.includes('퇴직금') && (question.includes('1년') || question.includes('일년') || question.includes('미만'))) {
    return '1년 미만 근무하면 법적으로 퇴직금을 못 받아요. 지급 규정과 예외 조건을 확인해보세요.';
  }

  // 18. 회사 폐업 퇴직금
  if (question.includes('퇴직금') && (question.includes('폐업') || question.includes('망') || question.includes('도산') || question.includes('파산'))) {
    return '회사가 망해도 퇴직금을 받을 수 있어요. 체당금 신청 방법과 우선변제권을 정확히 알려드려요.';
  }

  // 19. DB형 수령
  if (question.includes('DB') && (question.includes('수령') || question.includes('받'))) {
    return 'DB형 퇴직연금 수령 방법과 세금 계산법을 알려드려요. 일시금과 연금 중 선택 가능해요.';
  }

  // 20. DC형 수령
  if (question.includes('DC') && (question.includes('수령') || question.includes('받'))) {
    return 'DC형 퇴직연금은 운용수익이 포함돼요. 수령 방법과 세금 혜택을 자세히 알려드려요.';
  }

  // 21. 퇴직금 지급 기한
  if (question.includes('퇴직금') && (question.includes('기한') || question.includes('14일') || question.includes('언제'))) {
    return '퇴직금은 퇴직 후 14일 이내 지급이 원칙이에요. 늦어지면 연 20% 지연이자를 청구할 수 있어요.';
  }

  // 22. 근속연수
  if (question.includes('근속연수') || (question.includes('근속') && question.includes('연수'))) {
    return '퇴직금 계산에 필요한 근속연수 산정 방법 알려드려요. 1년 미만 기간도 일할 계산돼요.';
  }

  // 23. 퇴직연금 운용
  if (question.includes('퇴직연금') && (question.includes('운용') || question.includes('투자'))) {
    return '퇴직연금 운용 방법이 궁금하시죠? ETF와 펀드 선택 전략을 알려드려요.';
  }

  // 24. 퇴직연금 ETF
  if (question.includes('퇴직연금') && question.includes('ETF')) {
    return '퇴직연금으로 투자할 수 있는 안전자산과 배당 ETF 상품을 추천해드려요.';
  }

  // 25. 퇴직연금 수령 나이
  if (question.includes('퇴직연금') && (question.includes('나이') || question.includes('55세'))) {
    return '퇴직연금은 만 55세부터 받을 수 있어요. 조기 수령 조건과 세금 혜택을 알려드려요.';
  }

  // 일반 케이스
  const el = extractQuestionElements(question);
  const questionType = detectQuestionType(question);
  let desc = '';

  switch (questionType) {
    case 'possibility':
      desc = `${el.주제} ${el.행동} 할 수 있는지 궁금하셨죠? ${el.대상 ? `${el.대상}의 권리와 ` : ''}절차를 자세히 알려드려요.`;
      break;

    case 'comparison':
      desc = `${el.항목1 || el.주제}${getConnector(el.항목1 || el.주제)} ${el.항목2 || '다른 방식'}, 뭐가 다른지 헷갈리시죠? 핵심 차이점을 비교해 드려요.`;
      break;

    case 'time':
      desc = `${el.주제}이 되면 계약이 어떻게 바뀌는지 알려드려요. ${el.대상 ? `${el.대상}은 언제든 계약을 해지할 수 있어요.` : ''}`;
      break;

    case 'cost':
      desc = `${el.주제} 비용, 누가 부담하는지 궁금하시죠? 부담 기준을 명확히 알려드려요.`;
      break;

    case 'condition':
      desc = `${el.주제} ${el.행동} 조건이 궁금하셨죠? 자격 요건과 신청 방법을 알려드려요.`;
      break;

    case 'action':
    default:
      desc = `${el.주제} ${el.행동} 방법${el.대상 ? `과 ${el.대상}의 권리` : '와 절차'}를 알려드려요.`;
      break;
  }

  // 길이 조정
  if (desc.length > 120) {
    desc = desc.slice(0, 117) + '...';
  }
  if (desc.length < 40) {
    desc = `${title}에 대해 자세히 알려드려요`;
  }

  return desc;
}

// ============================================
// 9. slug 생성
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
// 10. YAML 출력
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
// 11. 메인 함수
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
    console.log('');
    console.log('타이틀 패턴 (콜론 스타일):');
    console.log('  "묵시적 갱신 후 법률 관계: 계약 기간 및 임차인 해지 권리"');
    console.log('  "부동산 중개보수 부담 주체: 임대인과 임차인 부담 기준"');
    process.exit(0);
  }

  const existingTitles = getExistingTitles();
  console.log(`📚 기존 위키 문서: ${existingTitles.size}개`);
  console.log('');

  // --check 모드
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

  // --batch 모드
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
      existingTitles.set(result.title, result.filename);
    }

    results.forEach((result, i) => {
      console.log(`\n=== ${i + 1}. ${questions[i]} ===`);
      printYaml(result);
    });

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
