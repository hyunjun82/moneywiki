import type { Metadata } from "next";
import HubView from "@/components/gold/HubView";
import { HOME_FAQ, faqJsonLd } from "@/components/gold/faqData";

/**
 * /gold — 오늘의 금시세 (고정 허브)
 *
 * 주소에 날짜를 넣지 않는다. 고정 허브여야 검색 트래픽이 한곳에 쌓인다.
 * 시세는 빌드가 아니라 브라우저가 quiz.jjyu.co.kr 에서 직접 읽는다.
 */

export const metadata: Metadata = {
  title: "오늘의 금시세 — 금 한 돈 살 때 팔 때 가격",
  description:
    "오늘 금 한 돈 시세를 살 때와 팔 때로 나눠 보여드립니다. 순금 24K·18K·14K와 백금·은 소매 시세, 한국거래소 도매 종가, 국제 금값을 한 화면에서 비교하세요.",
  keywords: ["금시세", "오늘의 금시세", "금 한 돈 가격", "순금 시세", "금값", "24K 금시세"],
  alternates: { canonical: "/gold" },
  openGraph: {
    type: "website",
    url: "/gold",
    title: "오늘의 금시세 — 금 한 돈 살 때 팔 때 가격",
    description:
      "순금 24K 한 돈을 살 때와 팔 때 가격, 한국거래소 도매 종가, 국제 금값을 한 화면에서 비교합니다.",
  },
};

export default function GoldHomePage() {
  return (
    <>
      {/* 홈 시안 helmet에 있던 FAQPage 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(HOME_FAQ)) }}
      />
      <HubView />
    </>
  );
}
