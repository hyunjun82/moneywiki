import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "서민금융 대출 종류 7가지 한눈에 비교 — 내게 맞는 상품 찾기 | 머니위키",
  description: "햇살론·새희망홀씨·미소금융 등 서민금융상품 비교. 신용등급별·나이별 추천 상품과 신청 절차 총정리.",
  alternates: { canonical: "https://jjyu.co.kr/w/서민금융-대출-종류-비교" },
  openGraph: {
    title: "서민금융 대출 종류 7가지 한눈에 비교 — 내게 맞는 상품 찾기",
    description: "햇살론·새희망홀씨·미소금융 등 서민금융상품 비교. 신용등급별·나이별 추천 상품과 신청 절차 총정리.",
    url: "https://jjyu.co.kr/w/서민금융-대출-종류-비교",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
