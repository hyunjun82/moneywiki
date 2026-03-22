import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세대출 한도, 나는 얼마까지 받을 수 있나요? 계산법과 조건 | 머니위키",
  description: "청년버팀목은 최대 2억원(보증금 80%), 신혼부부는 수도권 3억원까지 받을 수 있어요. MIN(보증금×80%, 상품 최대한도)로 계산하고, 전세가율이 높으면 LTV가 낮아질 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전세대출-한도-계산",
  },
  openGraph: {
    title: "전세대출 한도, 나는 얼마까지 받을 수 있나요? 계산법과 조건",
    description: "청년버팀목 최대 2억, 신혼부부 수도권 3억. 보증금 80% 이내 한도 계산법.",
    url: "https://www.jjyu.co.kr/w/전세대출-한도-계산",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
