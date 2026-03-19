import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 카드 전체 비교 — 신용·체크·선불 61종 환급률·연회비 | 머니위키",
  description: "K-패스 카드 61종을 한 화면에 비교해요. 신용·체크·선불 유형 필터, 연회비·실적 기준 정렬, 카드사별 신청 링크까지 — 내 조건에 맞는 카드 바로 찾아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-카드-비교" },
  openGraph: {
    title: "K-패스 카드 전체 비교 — 신용·체크·선불 61종 환급률·연회비 | 머니위키",
    description: "K-패스 카드 61종을 한 화면에 비교해요. 신용·체크·선불 유형 필터, 연회비·실적 기준 정렬, 카드사별 신청 링크까지 — 내 조건에 맞는 카드 바로 찾아요.",
    url: "https://www.jjyu.co.kr/w/K-패스-카드-비교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
