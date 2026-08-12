/**
 * ArticleData - 사용자 중심 문제해결 글 데이터 타입
 *
 * 설계 원칙:
 * 1. 검색자의 질문 흐름을 그대로 데이터 구조로 강제한다.
 * 2. 빈칸을 채우지 못하면 글 자체가 성립하지 않는다.
 * 3. 컴포넌트는 데이터가 요구할 때만 등장한다.
 * 4. 타이틀과 본문이 같은 키워드를 공유한다 (primaryKeywords).
 * 5. 본문 안 모든 수치는 sources의 한 항목에 매핑된다 (numericClaims).
 * 6. 법령 인용은 공식 사이트 원문에서 온다 (legalBasis.verifiedAt).
 */

export interface ArticleData {
  slug: string;
  category: string;

  /**
   * 메인 키워드 2~3개.
   * - meta.title: 최소 2개 포함
   * - mainSections[i].heading: 최소 1개 포함
   * - meta.description: 최소 1개 포함
   * 빌드 시 verify-articles.ts가 검증, 위반 시 빌드 실패.
   */
  primaryKeywords: [string, string] | [string, string, string];

  meta: {
    title: string;
    subtitle?: string;
    description: string;
    ogImage?: string;
    author?: {
      name: string;
      role?: string;
      bio?: string;
      avatarChar?: string;
    };
    publishedAt?: string;
  };

  searchIntent: {
    userQuestion: string;
    directAnswer: string;
    why: string;
  };

  /**
   * heroHook — 서론 문단. 타이틀이 나열한 항목을 결론부터 펼치고 마지막 문장은 행동 유도.
   * **강조**는 형광 마크로 렌더링. 없으면 directAnswer+why로 대체.
   */
  heroHook?: string;

  /** heroAct — 서론 직하 대형 CTA 버튼 1개. 공식 사이트(.go.kr/.or.kr)만. (정본 템플릿 .cta-main) */
  heroCta?: {
    label: string;
    url: string;
    org: string;
  };

  /** 📌 핵심콕콕 카드 7~9행. (정본 템플릿 .kf) */
  keyFacts?: { label: string; value: string }[];

  /** 3줄 요약 — 정확히 3개. (정본 템플릿 .sum) */
  summary?: [string, string, string];

  mainSections: MainSection[];

  resolution: {
    steps: ResolutionStep[];
    alternatives?: Alternative[];
  };

  context?: {
    legalBasis?: LegalReference[];
    edgeCases?: EdgeCase[];
    glossary?: GlossaryItem[];
    faqList?: FaqItem[];
    disclaimer?: string;
  };

  sources: SourceItem[];
  lastVerified: string;

  /**
   * 본문 안 모든 수치를 sources 인덱스에 매핑.
   * 매핑 없는 숫자는 빌드 경고, sourceIndex가 범위 밖이면 즉시 FAIL.
   */
  numericClaims?: NumericClaim[];

  relatedQuestions?: RelatedQuestion[];
}

/** 본문 안 수치-출처 매핑 */
export interface NumericClaim {
  value: string;
  sourceIndex: number;
  location?: string;
}

export type SectionWidget =
  | {
      type: 'calc-cta';
      slug: string;
      label?: string;
      note?: string;
    }
  | {
      type: 'stat-box';
      label: string;
      value: string;
      note?: string;
    }
  | {
      type: 'case-example';
      persona: string;
      result: string;
      note?: string;
    }
  | {
      type: 'def-box';
      term: string;
      definition: string;
    };

export interface MainSection {
  heading: string;
  body: string;
  highlight?: string;
  link?: {
    slug: string;
    label: string;
  };
  sourceQuote?: {
    excerpt: string;
    source: string;
  };
  compareTable?: {
    headers: string[];
    rows: CompareCell[][];
  };
  widgets?: SectionWidget[];
}

export type CompareCell =
  | string
  | { text: string; status?: 'ok' | 'no' | 'warn' };

export interface ResolutionStep {
  title: string;
  body: string;
  action?: {
    label: string;
    url: string;
    org: string;
  };
}

export interface Alternative {
  condition: string;
  description: string;
  link?: {
    slug: string;
    label: string;
  };
}

export interface EdgeCase {
  scenario: string;
  answer: string;
  link?: {
    slug: string;
    label: string;
  };
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface LegalReference {
  law: string;
  url: string;
  /**
   * 핵심 조문 발췌. researcher가 Claude in Chrome으로 url 페이지를 열어 직접 복사한 원문.
   * 의역/요약 금지. 페이지에서 literal substring match 가능해야 함.
   */
  excerpt?: string;
  /** researcher가 url 페이지에서 excerpt 원문을 직접 확인한 날짜. YYYY-MM-DD. */
  verifiedAt?: string;
  /** 시행일. 법령 개정 감지용. */
  effectiveDate?: string;
}

export interface SourceItem {
  title: string;
  url: string;
  org: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface RelatedQuestion {
  question: string;
  slug: string;
}

export interface ArticleCategory {
  category: string;
  articles: ArticleData[];
}
