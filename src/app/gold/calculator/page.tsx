import type { Metadata } from "next";
import CalculatorView from "@/components/gold/CalculatorView";
import { CALC_FAQ, faqJsonLd } from "@/components/gold/faqData";

/**
 * /gold/calculator — 금 계산기
 *
 * 제목·설명 단어는 네이버 자동완성 실측(2026-10-22)에 있는 검색어만 쓴다:
 *   금 계산기 · 18k 금 계산기 · 14k 금 계산기 · 금 계산기 1돈 · 금 계산기 팔때 · 금 한돈 시세 · 금 1돈 시세 · 금 한돈 시세 팔때 · 금 한돈 g
 * "금 1돈 시세"는 허브(/gold) 제목이 받는다 — 여기 제목은 "한돈"으로 나눈다.
 */

const TITLE = "금 계산기 — 금 한돈 시세 팔때·살때, 18K·14K";
const DESC =
  "금 계산기 — 금 1돈(한돈 3.75g)·그램 단위로 순금 24K·18K·14K 시세를 넣어 팔때 받는 값과 살때 내는 값(부가세 포함)을 계산합니다. 한국금거래소 오늘 고시가 기준으로 금 한돈 시세 팔때 가격을 바로 확인합니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: ["금 계산기", "금계산기", "18k 금 계산기", "14k 금 계산기", "금 계산기 1돈", "금 계산기 팔때", "금 한돈 시세", "금 1돈 시세", "금 한돈 시세 팔때", "금 한돈 g"],
  alternates: { canonical: "/gold/calculator" },
  openGraph: {
    type: "website",
    url: "/gold/calculator",
    title: TITLE,
    description: DESC,
  },
};

const SITE = "https://www.jjyu.co.kr";

/** 시세는 브라우저가 읽으므로 구조화 데이터에는 숫자를 넣지 않는다(faqData 머리말과 같은 이유). */
const LD = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "머니위키", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "오늘의 금시세", item: `${SITE}/gold` },
      { "@type": "ListItem", position: 3, name: "금 계산기", item: `${SITE}/gold/calculator` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "금 계산기",
    alternateName: ["금계산기", "18K 금 계산기", "14K 금 계산기", "금 한돈 시세 계산기"],
    url: `${SITE}/gold/calculator`,
    description: DESC,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "ko-KR",
    offers: { "@type": "Offer", price: 0, priceCurrency: "KRW" },
  },
  faqJsonLd(CALC_FAQ),
];

export default function GoldCalculatorPage() {
  return (
    <>
      {LD.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
      <CalculatorView />
    </>
  );
}
