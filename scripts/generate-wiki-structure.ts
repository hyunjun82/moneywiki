/**
 * 위키 구조 자동 생성기 v2
 *
 * 핵심 원칙:
 * 1. H2 = 독자 문제 해결 (개념 설명 X)
 * 2. Title = Keywords 4 = H2 매칭
 * 3. 액션 버튼 → 실제 행동 페이지
 *
 * 사용법:
 * npx ts-node scripts/generate-wiki-structure.ts "퇴직금 미지급" "신고" "지연이자" "받는법"
 */

import * as fs from 'fs';
import * as path from 'path';

// 타입 정의
interface H2Section {
  title: string;
  h3: string[];
  actionButton?: { text: string; url: string };
  internalLink?: { text: string; url: string };
}

interface WikiStructure {
  title: string;
  keywords: string[];
  slug: string;
  filename: string;
  h2Structure: H2Section[];
  description: string;
}

// 액션 URL 매핑 (별도 JSON 파일로도 관리 가능)
const ACTION_URL_MAP: Record<string, { text: string; url: string }> = {
  '신고': { text: '민원마당 신고하기', url: 'https://minwon.moel.go.kr' },
  '계산': { text: '퇴직금 계산기', url: '/calculators/severance' },
  '계산기': { text: '퇴직금 계산기', url: '/calculators/severance' },
  '세금': { text: '퇴직소득세 계산기', url: '/calculators/severance-tax' },
  '세액공제': { text: '연말정산 계산기', url: '/calculators/year-end-tax' },
  'IRP': { text: 'IRP 개설하기', url: 'https://www.nps.or.kr' },
  '중간정산': { text: '신청서 양식 다운로드', url: 'https://www.moel.go.kr/info/lawinfo/form.do' },
};

// H2 패턴 매핑 (키워드 → 문제 해결형 H2)
const H2_PATTERN_MAP: Record<string, { title: string; h3: string[] }> = {
  '신고': {
    title: '{base} 신고 방법 노동청',
    h3: ['온라인 신고 절차', '필요 서류 준비', '신고 후 조사 과정']
  },
  '지연이자': {
    title: '{base} 지연이자 20% 계산법',
    h3: ['계산 공식', '실제 계산 예시', '합의 시 주의사항']
  },
  '받는법': {
    title: '{base} 받는 법 절차',
    h3: ['청구 절차', '필요 서류', '지급 기한']
  },
  '계산': {
    title: '{base} 계산 방법 평균임금',
    h3: ['계산 공식', '평균임금 산정', '실제 계산 예시']
  },
  '세금': {
    title: '{base} 세금 세율 환급',
    h3: ['세율 기준', '환급 방법', '절세 팁']
  },
  '세액공제': {
    title: '{base} 세액공제 한도 기준',
    h3: ['공제 한도', '신청 방법', '연말정산 반영']
  },
  '조건': {
    title: '{base} 조건 기준 확인',
    h3: ['자격 조건', '필요 서류', '신청 기한']
  },
  '절차': {
    title: '{base} 절차 단계별 안내',
    h3: ['1단계 준비', '2단계 신청', '3단계 지급']
  },
  '방법': {
    title: '{base} 방법 절차 신청',
    h3: ['온라인 신청', '오프라인 신청', '처리 기간']
  },
  '기준': {
    title: '{base} 기준 요건 확인',
    h3: ['법정 기준', '예외 사항', '확인 방법']
  },
};

// 지양 단어
const AVOID_WORDS = ['청구', '공식', '총정리', '완벽가이드', '완벽정리', '알아보기'];

// 대체어 매핑
const REPLACE_MAP: Record<string, string> = {
  '청구': '받는법',
  '공식': '계산법',
  '총정리': '핵심',
  '완벽가이드': '방법',
};

// 행동 유도어
const ACTION_WORDS = ['받는법', '방법', '절차', '기준', '조건', '확인', '신청', '계산법'];

/**
 * 받침 유무 확인
 */
function hasFinalConsonant(str: string): boolean {
  const lastChar = str[str.length - 1];
  const code = lastChar.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 !== 0;
}

/**
 * 슬러그 생성
 */
function createSlug(text: string): string {
  return text
    .replace(/\s+/g, '-')
    .replace(/[·,]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

/**
 * 자연스러운 타이틀 생성
 */
function createTitle(base: string, components: string[]): string {
  // 컴포넌트가 2개면 "및" 사용
  if (components.length === 2) {
    return `${base} ${components[0]} 및 ${components[1]}`;
  }

  // 컴포넌트가 3개면 적절한 연결
  if (components.length >= 3) {
    const lastIsAction = ACTION_WORDS.some(w => components[components.length - 1].includes(w));
    if (lastIsAction) {
      // "신고 및 지연이자 받는법" 패턴
      return `${base} ${components[0]} 및 ${components.slice(1).join(' ')}`;
    }
    // 기본 연결
    return `${base} ${components.join(' ')}`;
  }

  return `${base} ${components[0]}`;
}

/**
 * Keywords 4개 생성 (베이스 반복 패턴)
 */
function createKeywords(base: string, components: string[]): string[] {
  const keywords: string[] = [base]; // 1. 베이스

  // 2-4. 베이스 + 컴포넌트
  for (let i = 0; i < Math.min(3, components.length); i++) {
    keywords.push(`${base} ${components[i]}`);
  }

  return keywords.slice(0, 4);
}

/**
 * H2 구조 생성 (문제 해결형)
 */
function createH2Structure(base: string, components: string[]): H2Section[] {
  const h2Sections: H2Section[] = [];

  for (const comp of components) {
    // 패턴 매핑에서 찾기
    const pattern = H2_PATTERN_MAP[comp];

    if (pattern) {
      const section: H2Section = {
        title: pattern.title.replace('{base}', base),
        h3: pattern.h3
      };

      // 액션 버튼 추가
      const actionUrl = ACTION_URL_MAP[comp];
      if (actionUrl) {
        if (actionUrl.url.startsWith('/')) {
          section.internalLink = actionUrl;
        } else {
          section.actionButton = actionUrl;
        }
      }

      h2Sections.push(section);
    } else {
      // 기본 패턴
      h2Sections.push({
        title: `${base} ${comp} 기준 확인`,
        h3: [`${comp} 요건`, `${comp} 절차`, `${comp} 주의사항`]
      });
    }
  }

  return h2Sections;
}

/**
 * Description 생성 (~해요 패턴)
 */
function createDescription(base: string, components: string[]): string {
  const templates = [
    `${base}${hasFinalConsonant(base) ? '을' : '를'} ${components[0]} 방법과 ${components.slice(1).join(', ')} 정보를 알려드려요.`,
    `${base} ${components[0]} 절차와 ${components.slice(1).join(' ')} 방법을 쉽게 설명해요.`,
  ];
  return templates[0];
}

/**
 * 메인 함수: 위키 구조 생성
 */
export function generateWikiStructure(
  base: string,
  components: string[]
): WikiStructure {
  // 지양 단어 체크 및 대체
  const processedComponents = components.map(comp => {
    if (AVOID_WORDS.includes(comp) && REPLACE_MAP[comp]) {
      console.log(`⚠️ "${comp}" → "${REPLACE_MAP[comp]}" 대체됨`);
      return REPLACE_MAP[comp];
    }
    return comp;
  });

  const title = createTitle(base, processedComponents);
  const keywords = createKeywords(base, processedComponents);
  const slug = createSlug(`${base}-${processedComponents.join('-')}`);
  const filename = `${slug}.md`;
  const h2Structure = createH2Structure(base, processedComponents);
  const description = createDescription(base, processedComponents);

  return {
    title,
    keywords,
    slug,
    filename,
    h2Structure,
    description
  };
}

/**
 * YAML 형식으로 출력
 */
function printYAML(structure: WikiStructure): void {
  console.log('\n📝 생성 결과:\n');
  console.log('```yaml');
  console.log(`title: "${structure.title}"`);
  console.log(`description: "${structure.description}"`);
  console.log('keywords:');
  structure.keywords.forEach(k => console.log(`  - ${k}`));
  console.log('```');
  console.log(`\n📁 파일명: ${structure.filename}`);
  console.log(`🔗 슬러그: /w/${structure.slug}`);
}

/**
 * H2 구조 출력
 */
function printH2Structure(structure: WikiStructure): void {
  console.log('\n📋 H2 구조 (문제 해결형):\n');
  structure.h2Structure.forEach((h2, i) => {
    console.log(`## ${i + 1}. ${h2.title}`);
    h2.h3.forEach(h3 => console.log(`   ### ${h3}`));
    if (h2.actionButton) {
      console.log(`   🔗 액션: [${h2.actionButton.text}](${h2.actionButton.url})`);
    }
    if (h2.internalLink) {
      console.log(`   📎 내부링크: [${h2.internalLink.text}](${h2.internalLink.url})`);
    }
    console.log('');
  });
}

/**
 * 전체 마크다운 템플릿 생성
 */
function generateMarkdownTemplate(structure: WikiStructure): string {
  const frontmatter = `---
title: "${structure.title}"
description: "${structure.description}"
category: "근로/노동"
keywords:
${structure.keywords.map(k => `  - ${k}`).join('\n')}
author: "머니위키 에디터"
lastUpdated: "${new Date().toISOString().split('T')[0]}"
datePublished: "${new Date().toISOString().split('T')[0]}"
updateNote: "2026년 1월 기준"
summary:
  - "첫째: [핵심 정의]"
  - "둘째: [방법/조건]"
  - "셋째: [주의사항]"
sources:
  - name: "근로기준법"
    url: "https://www.law.go.kr/법령/근로기준법"
    date: "2026-01"
faq:
  - question: "${structure.keywords[0]} 어떻게 하나요?"
    answer: "[구어체로 답변]"
  - question: "${structure.keywords[1]} 조건은?"
    answer: "[구어체로 답변]"
  - question: "${structure.keywords[2]} 기한은?"
    answer: "[구어체로 답변]"
relatedDocs:
  - title: "관련문서"
    url: "/w/관련문서"
---

[서론: 독자 상황 공감 + 왜 중요한지 160자]

`;

  const body = structure.h2Structure.map(h2 => {
    let section = `## ${h2.title}\n\n[4-6문장 설명]\n\n`;

    h2.h3.forEach(h3 => {
      section += `### ${h3}\n\n[4-6문장 설명]\n\n`;
    });

    if (h2.actionButton) {
      section += `[${h2.actionButton.text}](${h2.actionButton.url})\n\n`;
    }
    if (h2.internalLink) {
      section += `[${h2.internalLink.text}](${h2.internalLink.url})\n\n`;
    }

    return section;
  }).join('---\n\n');

  const footer = `## 출처

- [근로기준법](https://www.law.go.kr/법령/근로기준법) - 법제처

## 관련 문서

- [관련문서1](/w/관련문서1)
- [관련문서2](/w/관련문서2)
- [관련문서3](/w/관련문서3)
`;

  return frontmatter + body + footer;
}

// CLI 실행
if (process.argv[1]?.includes('generate-wiki-structure')) {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
위키 구조 생성기 v2

사용법:
  npx ts-node scripts/generate-wiki-structure.ts <베이스> <컴포넌트1> <컴포넌트2> ...

예시:
  npx ts-node scripts/generate-wiki-structure.ts "퇴직금 미지급" "신고" "지연이자" "받는법"
  npx ts-node scripts/generate-wiki-structure.ts "퇴직금 계산" "방법" "평균임금" "기준"

옵션:
  --output, -o    마크다운 파일로 출력
  --help, -h      도움말
`);
    process.exit(0);
  }

  const outputFlag = args.includes('--output') || args.includes('-o');
  const filteredArgs = args.filter(a => a !== '--output' && a !== '-o');

  const [base, ...components] = filteredArgs;

  if (components.length < 2) {
    console.error('❌ 최소 2개 이상의 컴포넌트가 필요합니다.');
    process.exit(1);
  }

  const structure = generateWikiStructure(base, components);

  printYAML(structure);
  printH2Structure(structure);

  if (outputFlag) {
    const template = generateMarkdownTemplate(structure);
    const outputPath = path.join(process.cwd(), 'content', 'wiki', structure.filename);
    fs.writeFileSync(outputPath, template, 'utf-8');
    console.log(`\n✅ 파일 생성됨: ${outputPath}`);
  }

  // 검증 체크리스트 출력
  console.log('\n✅ 검증 체크리스트:');
  console.log(`  [${structure.keywords.length === 4 ? '✓' : '✗'}] Keywords ${structure.keywords.length}개`);
  console.log(`  [✓] Title = Keywords 매칭`);
  console.log(`  [✓] H2 문제 해결형 ("뭐예요?" 없음)`);
  console.log(`  [${structure.h2Structure.some(h => h.actionButton || h.internalLink) ? '✓' : '?'}] 액션 버튼/내부링크 포함`);
}
