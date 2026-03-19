import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "K-패스 체크카드 추천 — 실적·연회비 없는 카드 비교 | 머니위키",
  description: "K-패스 체크카드는 연회비도 전월실적도 없어요. 카카오뱅크·토스뱅크·케이뱅크·신한 중 내 주거래 은행에 맞는 카드 고르는 방법이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/K-패스-체크카드-추천" },
  openGraph: {
    title: "K-패스 체크카드 추천 — 실적·연회비 없는 카드 비교 | 머니위키",
    description: "K-패스 체크카드는 연회비도 전월실적도 없어요. 카카오뱅크·토스뱅크·케이뱅크·신한 중 내 주거래 은행에 맞는 카드 고르는 방법이에요.",
    url: "https://www.jjyu.co.kr/w/K-패스-체크카드-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
