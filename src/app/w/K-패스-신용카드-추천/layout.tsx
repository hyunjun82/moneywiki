import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 신용카드 추천 — 소비 패턴별 추가 할인까지 챙기는 1장",
  description: "K-패스 신용카드 5종 비교. 환급률은 전부 같고 연회비·추가 할인만 달라요. 편의점·카페·온라인쇼핑 소비 패턴별로 어떤 카드가 유리한지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-신용카드-추천" },
  openGraph: {
    title: "K-패스 신용카드 추천 — 소비 패턴별 추가 할인까지 챙기는 1장",
    description: "K-패스 신용카드 5종 비교. 환급률은 전부 같고 연회비·추가 할인만 달라요. 편의점·카페·온라인쇼핑 소비 패턴별로 어떤 카드가 유리한지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/K-패스-신용카드-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
