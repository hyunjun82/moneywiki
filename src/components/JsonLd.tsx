// JSON-LD 스키마 컴포넌트 - SEO 극대화
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  author?: string;
  image?: string;
  keywords?: string[];
  category?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

// Article 스키마 - 기본 문서용
export function ArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
  author = "머니위키",
  image = "https://www.jjyu.co.kr/og-image.png",
  keywords = [],
  category,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    url: url,
    datePublished: datePublished,
    dateModified: dateModified,
    inLanguage: "ko-KR",
    ...(keywords.length > 0 && { keywords: keywords.join(", ") }),
    ...(category && { articleSection: category }),
    author: {
      "@type": "Organization",
      name: author,
      url: "https://www.jjyu.co.kr",
    },
    publisher: {
      "@type": "Organization",
      name: "머니위키",
      url: "https://www.jjyu.co.kr",
      logo: {
        "@type": "ImageObject",
        url: "https://www.jjyu.co.kr/logo.png",
      },
    },
    image: image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ 스키마 - 자주 묻는 질문 (구글 피처드 스니펫)
export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// HowTo 스키마 - 방법/절차 설명 (구글 리치 스니펫)
export function HowToSchema({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}) {
  // 방어적 처리: steps가 없거나 빈 배열이면 렌더링하지 않음
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return null;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    totalTime: totalTime,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb 스키마 - 탐색 경로
export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebSite 스키마 - 사이트 전체 (위키트리 벤치마킹)
// Google 검색창에서 사이트 내 검색 기능 노출 (SearchAction)
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "머니위키",
    alternateName: "MoneyWiki",
    url: "https://www.jjyu.co.kr",
    description: "퇴직금, 세금, 부동산, 대출 정보를 쉽게 찾아보세요. 정부 사이트보다 쉽고, 블로그보다 정확하게.",
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Organization",
      name: "머니위키",
      url: "https://www.jjyu.co.kr",
    },
    // SearchAction: Google 검색 결과에서 사이트 내 검색 가능
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.jjyu.co.kr/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Organization 스키마 - 조직 정보 (위키트리 벤치마킹)
// Google News 등록, 브랜드 신뢰도 향상, 소셜 미디어 연결
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "머니위키",
    alternateName: "MoneyWiki",
    url: "https://www.jjyu.co.kr",
    logo: {
      "@type": "ImageObject",
      url: "https://www.jjyu.co.kr/logo.png",
      width: 600,
      height: 60,
    },
    description: "경제, 금융, 법률 정보를 쉽게 설명하는 위키. 정부 사이트보다 쉽고, 블로그보다 정확하게.",
    // sameAs: 소셜 미디어 프로필 연결 (브랜드 신뢰도 + Knowledge Panel)
    sameAs: [
      // 소셜 미디어 계정 추가 시 여기에 URL 입력
      // "https://www.youtube.com/@moneywiki",
      // "https://www.instagram.com/moneywiki",
      // "https://twitter.com/moneywiki",
      // "https://www.facebook.com/moneywiki",
    ],
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "머니위키 에디터",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "Korean",
      url: "https://www.jjyu.co.kr/contact",
    },
    // 발행사 정보 (E-E-A-T 강화)
    publishingPrinciples: "https://www.jjyu.co.kr/about",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Calculator 스키마 - 계산기 도구용 (SoftwareApplication)
export function CalculatorSchema({
  name,
  description,
  url,
  datePublished,
  dateModified,
  category,
  keywords = [],
}: {
  name: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  category?: string;
  keywords?: string[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: name,
    description: description,
    url: url,
    applicationCategory: "CalculatorApplication",
    applicationSubCategory: category || "금융 계산기",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    datePublished: datePublished,
    dateModified: dateModified,
    inLanguage: "ko-KR",
    ...(keywords.length > 0 && { keywords: keywords.join(", ") }),
    author: {
      "@type": "Organization",
      name: "머니위키",
      url: "https://www.jjyu.co.kr",
    },
    provider: {
      "@type": "Organization",
      name: "머니위키",
      url: "https://www.jjyu.co.kr",
    },
    // 🚨 [안전 조치] 실제 리뷰 기능 개발 전까지 주석 처리
    // 구글 가이드라인: 페이지에 평점 표시 없으면 페널티 위험
    // 참고: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
    /* aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1247",
      bestRating: "5",
      worstRating: "1",
    }, */
    featureList: [
      "실시간 자동 계산",
      "모바일 최적화",
      "2026년 최신 기준",
      "무료 이용",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Event 스키마 - 정부 지원금 신청 기간용 (CTR 30-50% ↑)
// Google 검색 결과에 날짜 표시 → 클릭율 대폭 증가
export function EventSchema({
  name,
  description,
  startDate,
  endDate,
  url,
  organizerName,
  organizerUrl,
}: {
  name: string;
  description: string;
  startDate: string; // ISO 8601: "2026-02-03T09:00"
  endDate: string;
  url: string;
  organizerName: string;
  organizerUrl: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: name,
    description: description,
    startDate: startDate,
    endDate: endDate,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: url,
    },
    organizer: {
      "@type": "Organization",
      name: organizerName,
      url: organizerUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// WebApplication 스키마 - 웹 앱용 (Calculator 보완)
export function WebApplicationSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: name,
    description: description,
    url: url,
    applicationCategory: "FinanceApplication",
    browserRequirements: "Requires JavaScript",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    provider: {
      "@type": "Organization",
      name: "머니위키",
      url: "https://www.jjyu.co.kr",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ItemList 스키마 - Hub 페이지용 (내부 SEO 강화)
// Hub 페이지에 연결된 Spoke 글 목록을 구조화하여 구글에 전달
export function ItemListSchema({
  items,
}: {
  items: Array<{ name: string; url: string; position: number }>;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
