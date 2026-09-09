import type { Metadata } from "next";
import HubView from "@/components/gold/HubView";
import { HOME_FAQ, faqJsonLd } from "@/components/gold/faqData";

/**
 * /gold — 오늘의 금시세 (고정 허브, 목업 v2 구조 — 스펙 7절)
 *
 * 주소에 날짜를 넣지 않는다. 고정 허브여야 검색 트래픽이 한곳에 쌓인다.
 * 시세는 빌드가 아니라 브라우저가 price-data 브랜치의 gold.json 을 직접 읽는다.
 */

const TITLE = "오늘의 금시세 | 순금 1돈 살 때 팔 때 · 18K 14K 매입가 · 한국거래소 기준가";
const DESC =
  "한국금거래소 오늘 고시가로 순금 1돈(3.75g) 살 때(부가세 포함)·팔 때 가격, 18K·14K 매입가, 백금·은 시세를 한 화면에서 봅니다. 국제 금값×환율 기준가와 KRX 도매 종가, 살 때 가격 분해와 회차별 고시 이력까지.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  keywords: ["금시세", "오늘의 금시세", "금 한 돈 가격", "순금 시세", "금값", "24K 금시세", "18K 매입가", "14K 매입가", "금 1돈 살 때", "금 1돈 팔 때"],
  alternates: { canonical: "/gold" },
  openGraph: {
    type: "website",
    url: "/gold",
    title: TITLE,
    description: DESC,
  },
};

export default function GoldHomePage() {
  return (
    <>
      {/* FAQPage 구조화 데이터 — 화면 FAQ 와 같은 문항(faqData.HOME_FAQ) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(HOME_FAQ)) }}
      />
      <HubView />
    </>
  );
}
