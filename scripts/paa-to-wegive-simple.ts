#!/usr/bin/env node

// ============================================================================
// Section 1: Type Definitions
// ============================================================================

interface WegiveOutput {
  title: string;
  description: string;
  category: string;
  keywords: string[];
}

interface TitleKeywords {
  title: string;
  keywords: string[];
}

// ============================================================================
// Section 2: Title & Keywords Generation - Special Cases (7개만)
// ============================================================================

function generateTitleAndKeywords(question: string): TitleKeywords {
  const q = question.replace(/\?/g, '').trim();

  // 1. 근로계약 + 출근 안함
  if (q.includes('근로계약') && (q.includes('출근 안') || q.includes('안하면') || q.includes('미출근'))) {
    return {
      title: '근로계약 체결 후 미출근 시 법적 책임 및 손해배상',
      keywords: ['근로계약 미출근', '미출근 손해배상', '근로계약 파기', '출근 전 퇴사']
    };
  }

  // 2. 중개수수료/중개보수 부담
  if (q.includes('중개수수료') || q.includes('중개보수')) {
    return {
      title: '부동산 중개보수 부담 주체: 임대인과 임차인 부담 기준',
      keywords: ['부동산 중개수수료', '중개수수료 임차인', '중개보수 부담', '묵시적 갱신 중개수수료']
    };
  }

  // 3. 묵시적 갱신 지나면/후
  if ((q.includes('묵시적') || q.includes('묵시적갱신')) && (q.includes('지나면') || q.includes('후'))) {
    return {
      title: '묵시적 갱신 후 법률 관계: 계약 기간 및 임차인 해지 권리',
      keywords: ['묵시적 갱신', '묵시적 갱신 후 계약해지', '묵시적 갱신 기간', '임차인 계약해지']
    };
  }

  // 4. 상가임대차 갱신 후 해지
  if (q.includes('상가') && q.includes('갱신') && q.includes('해지')) {
    return {
      title: '상가임대차 갱신 계약의 중도 해지: 가능 여부 및 위약금',
      keywords: ['상가 계약해지', '상가 갱신 계약 해지', '상가 중도해지 위약금', '임차인 중도해지']
    };
  }

  // 5. 계약갱신청구권 vs 묵시적 갱신 차이
  if (q.includes('계약갱신청구권') && q.includes('묵시적') && q.includes('차이')) {
    return {
      title: '계약갱신청구권과 묵시적 갱신의 차이: 법적 효력 및 유불리 비교',
      keywords: ['계약갱신청구권 묵시적갱신', '계약갱신청구권 차이', '묵시적갱신 보증금', '5%룰']
    };
  }

  // 기본 케이스 - 매칭 실패 시 에러 안내
  console.error(`⚠️  매칭 실패: "${q}"`);
  console.error('💡 이 질문에 대한 특수 케이스를 추가하세요:');
  console.error('');
  console.error(`  // ${q}`);
  console.error(`  if (q.includes('키워드')) {`);
  console.error(`    return {`);
  console.error(`      title: '적절한 타이틀',`);
  console.error(`      keywords: ['키워드1', '키워드2', '키워드3', '키워드4']`);
  console.error(`    };`);
  console.error(`  }`);
  console.error('');

  process.exit(1);
}

// ============================================================================
// Section 3: Description Generation
// ============================================================================

function generateDescription(question: string, title: string): string {
  let desc = question.replace(/\?/g, '').trim();

  if (!desc.endsWith('요')) {
    desc += '요';
  }

  const titleCore = title.includes(':') ? title.split(':')[0].trim() : title.split('및')[0].trim();

  return `${desc}. ${titleCore}에 대해 알려드려요`;
}

// ============================================================================
// Section 4: Category Generation
// ============================================================================

function inferCategory(question: string): string {
  const q = question.toLowerCase();

  if (q.includes('중개수수료') || q.includes('상가') || q.includes('묵시적') || q.includes('전입신고') || q.includes('임대차')) {
    return '부동산';
  }
  if (q.includes('근로') || q.includes('실업') || q.includes('급여') || q.includes('고용')) {
    return '고용/실업';
  }
  if (q.includes('퇴직금') || q.includes('퇴직연금') || q.includes('irp') || q.includes('연금')) {
    return '퇴직/연금';
  }
  if (q.includes('세금') || q.includes('공제') || q.includes('소득세') || q.includes('연말정산')) {
    return '세금';
  }

  return '금융';
}

// ============================================================================
// Section 5: Main Function & CLI
// ============================================================================

function paaToWegive(question: string): WegiveOutput {
  const { title, keywords } = generateTitleAndKeywords(question);
  const description = generateDescription(question, title);
  const category = inferCategory(question);

  return { title, description, category, keywords };
}

// CLI 인터페이스
const question = process.argv[2];

if (!question) {
  console.error('Usage: npx tsx scripts/paa-to-wegive-simple.ts "질문"');
  console.error('');
  console.error('예시:');
  console.error('  npx tsx scripts/paa-to-wegive-simple.ts "근로계약서 쓰고 출근 안하면?"');
  console.error('  npx tsx scripts/paa-to-wegive-simple.ts "중개수수료는 임차인이 부담해야 하나요?"');
  console.error('  npx tsx scripts/paa-to-wegive-simple.ts "묵시적갱신 지나면?"');
  process.exit(1);
}

const result = paaToWegive(question);

// YAML 형식 출력
console.log(`---`);
console.log(`title: "${result.title}"`);
console.log(`description: "${result.description}"`);
console.log(`category: "${result.category}"`);
console.log(`keywords:`);
result.keywords.forEach(k => console.log(`  - ${k}`));
console.log(`---`);
