import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 신용카드 추천 — 연회비·추가혜택 비교 5종 | 머니위키",
  description: "K-패스 신용카드 중 연회비 대비 추가 혜택이 좋은 카드 5종을 비교했어요. 전월실적 30만원 채우면 쇼핑·카페 할인까지 같이 챙기는 방법이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-신용카드-추천" },
  openGraph: {
    title: "K-패스 신용카드 추천 — 연회비·추가혜택 비교 5종 | 머니위키",
    description: "K-패스 신용카드 중 연회비 대비 추가 혜택이 좋은 카드 5종을 비교했어요. 전월실적 30만원 채우면 쇼핑·카페 할인까지 같이 챙기는 방법이에요.",
    url: "https://www.jjyu.co.kr/w/K-패스-신용카드-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
