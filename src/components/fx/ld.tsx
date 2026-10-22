/**
 * /fx 구조화 데이터 — 서버 전용. 빌드 때 스냅숏 값으로 굽는다.
 */

import type { Faq } from "./fxDerive";

const SITE = "https://www.jjyu.co.kr";

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

/** 페이지 자체 — dateModified 는 환율을 받은 시각(스냅숏 updatedAt). 제목 숫자가 바뀌는 날이 곧 수정일이다. */
export function webPageLd(p: { path: string; name: string; description: string; dateModified?: string | null }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE}${p.path}`,
    url: `${SITE}${p.path}`,
    name: p.name,
    description: p.description,
    inLanguage: "ko-KR",
    ...(p.dateModified ? { dateModified: p.dateModified } : {}),
    isPartOf: { "@type": "WebSite", name: "머니위키", url: SITE },
    publisher: { "@type": "Organization", name: "머니위키", url: SITE },
  };
}

export function faqLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object | null | undefined }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
