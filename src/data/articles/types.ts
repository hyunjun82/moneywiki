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

  /**
   * 정리 — "떠나기 전 체크". 타이틀 항목 수만큼(2~5). (정본 템플릿 .sum)
   * 옛 글의 3줄 튜플도 그대로 들어간다.
   */
  summary?: string[];

  /**
   * 검증 배지 — 무엇과 대조했고 언제인지. (정본 템플릿 .verify)
   * 예: { note: "고용24 모의계산 대조 · 시행령 제68조 원문 확인", date: "2026-09-02" }
   * 날짜 없는 배지는 배지가 아니다. 증거 JSON 의 수집일에서 온다.
   */
  verify?: { note: string; date: string };

  /**
   * 첫 화면 즉답 위젯 — 검색자의 첫 질문("나는 얼마?")에 숫자로 답한다. (정본 템플릿 .now)
   * 계산이 필요한 주제만. 계산식은 글마다 달라 컴포넌트를 이름으로 고른다
   * (src/components/article/quick/<component>.tsx). 산식의 상수는 본문 표와 같은 증거에서 온다.
   */
  heroWidget?: {
    type: 'quick-calc';
    component: string;
    title: string;
    hint?: string;
    /** 위젯 아래 한 줄 — 산식 설명 */
    formula?: string;
    /** 더 자세한 계산기 글로 잇는 링크 */
    more?: { slug: string; label: string };
    /** 컴포넌트가 읽는 상수 (하한·상한·일수표 등). 증거 JSON 값과 같아야 한다 */
    params?: Record<string, unknown>;
  };

  /** 첫 화면 핵심 숫자 박스 2개 (정본 템플릿 .stats) */
  heroStats?: { label: string; value: string; unit?: string; note?: string }[];

  /**
   * 대제목 섹션 — 개수 = 타이틀이 약속한 항목 수 (2~4).
   * 세부 질문은 각 섹션의 subsections 로 들어간다.
   */
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
      /**
       * 체크리스트 — 정본 템플릿 .check
       * 조건·요건을 나열하는 비주얼. "비주얼 먼저, 해설 뒤" 원칙의 기본 도구.
       * items의 **강조**는 형광 마크로 렌더링.
       */
      type: 'checklist';
      items: string[];
    }
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
    }
  | {
      /**
       * 판정 — 정본 템플릿 .decide
       * 항목 3~5개를 충족/미충족으로 누르면 결과와 "다음 할 일"이 나온다.
       * next 는 그 항목이 미충족일 때 할 일. okText 는 전부 충족일 때.
       */
      type: 'decide';
      items: { q: string; sub?: string; next: string }[];
      okText: string;
    }
  | {
      /** 산식 흐름 — 정본 템플릿 .flow. 마지막 칸(hi)이 실제 적용값 */
      type: 'flow';
      steps: { cap: string; val: string; sub?: string; hi?: boolean }[];
    }
  | {
      /** 단계 탭 — 정본 템플릿 .stepbar. 3~5단계, 단계마다 준비물·소요·행동 버튼 */
      type: 'stepbar';
      steps: {
        tab: string;
        title: string;
        body: string;
        prep?: string;
        time?: string;
        action?: { label: string; url: string; primary?: boolean };
      }[];
    }
  | {
      /** 타임라인 — 정본 템플릿 .tl. 날짜 라벨(d) · 제목(t) · 설명(m). pay 는 입금 칸 강조 */
      type: 'timeline';
      items: { d: string; t: string; m: string; pay?: boolean }[];
    };

/**
 * 세부 질문(h3). 대제목 아래에 붙는다. 검색자가 실제로 묻는 문장이 heading 이고 answer 가 한 줄 답이다.
 */
export interface SubSection {
  id?: string;
  heading: string;
  answer: string;
  body?: string;
  highlight?: string;
  compareTable?: CompareTable;
  widgets?: SectionWidget[];
  cta?: MainSection['cta'];
  /** 접힌 근거 조문 — 숫자가 있는 섹션엔 반드시 있다 */
  quote?: LawQuote;
}

/** 접힌 근거 조문 (정본 템플릿 details.quote). law 는 "고용보험법 제40조 제1항", text 는 원문 */
export interface LawQuote {
  law: string;
  text: string;
}

export interface CompareTable {
  /** 무슨 표인지 (정본 템플릿 figcaption) — 필수 */
  caption?: string;
  headers: string[];
  rows: CompareCell[][];
  /** 기준·단위·출처 (정본 템플릿 .fn) */
  footnote?: string;
  /** 모바일에서 행을 카드로 접는다. 열이 4개 이상이거나 셀에 링크가 있으면 켠다 */
  cards?: boolean;
}

export interface MainSection {
  /**
   * 소제목 위 짧은 주제 라벨. (정본 템플릿 .eyebrow — "지원 대상", "구비 서류")
   * 4~8자. 소제목을 잘라 쓰지 않는다 — 바로 아래 h2와 같은 말이 반복되면 안 된다.
   */
  eyebrow: string;

  /** 검색자 질문형 "~나요". 목차와 글자 그대로 같다 */
  heading: string;
  /** 한 줄 답 (정본 템플릿 .ans). 질문형 제목엔 반드시 있다 */
  answer?: string;
  body: string;
  highlight?: string;
  /** 세부 질문(h3). 이 대제목이 약속한 항목의 하위 질문들 */
  subsections?: SubSection[];
  /** 접힌 근거 조문 */
  quote?: LawQuote;

  /**
   * 섹션 하단 행동 버튼 — 신청·조회·다운로드처럼 그 섹션이 안내한 일을 바로 하는 자리.
   * url은 기관 홈이 아니라 실제 그 일을 하는 화면이어야 한다 (검증기가 막는다).
   * q1처럼 행동 섹션에 두면 읽고 바로 움직일 수 있다.
   */
  cta?: {
    label: string;
    url: string;
    org: string;
    /** 버튼 아래 보조 안내 (처리기간·자격 등) */
    note?: string;
  };

  /**
   * 내부 유도 — 스포크/허브/계산기로 자연스럽게 넘긴다.
   * bridge는 링크 앞에 놓이는 유도 문장이며 필수다.
   *   bridge: "계산 방법을 잘 살펴보셨나요? 그렇다면 실제 금액부터 확인해 보시는 게 좋겠죠."
   *   label:  "퇴직금 계산 방법 보기"
   */
  link?: {
    slug: string;
    label: string;
    bridge: string;
  };
  sourceQuote?: {
    excerpt: string;
    source: string;
  };
  compareTable?: CompareTable;
  widgets?: SectionWidget[];
}

/**
 * 표 셀. status로 강조를 지정한다. (정본 템플릿 td.g / td.k / td.s)
 *  ok   초록 강조 — 되는 경우, 유리한 값
 *  warn 모래색 경고 / no 도 동일 처리
 *  key  항목 라벨 (첫 열)
 *  sub  보조 강조
 * 확장:
 *  tag      작은 라벨 칩 ("하한"·"상한"). tagTone 으로 색
 *  doc      회색 보조 줄 ("급여명세서 (회사)")
 *  links    "그 일을 하는 화면" 링크들 — 기관 홈 금지
 *  hideOnMobile  카드 모드에서 숨김 (덜 중요한 열)
 */
export type CompareCell =
  | string
  | {
      text?: string;
      status?: 'ok' | 'no' | 'warn' | 'key' | 'sub';
      tag?: string;
      tagTone?: 'lo' | 'hi' | 'neutral';
      doc?: string;
      links?: { label: string; url: string }[];
      hideOnMobile?: boolean;
    };

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
  /**
   * 출처 묶음 (정본 템플릿 .src 4묶음). 하나라도 group 이 있으면 묶어서 그린다.
   * '법령' · '행정규칙·안내' · '정부 도구' · '검증 방법'
   */
  group?: '법령' | '행정규칙·안내' | '정부 도구' | '검증 방법';
  /** 묶음 안에서 보여줄 설명 (조문 번호 나열, 대조 건수 등). 없으면 title 을 쓴다 */
  note?: string;
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
