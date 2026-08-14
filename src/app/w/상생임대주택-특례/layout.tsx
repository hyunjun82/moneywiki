import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상생임대주택 특례, 거주 안 해도 비과세 가능? 조건과 신청",
  description: "상생임대주택 특례를 적용하면 거주하지 않아도 1세대 1주택 비과세를 받을 수 있어요. 직전계약 1년6개월 + 상생계약 2년, 임대료 5% 이내 조건.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/상생임대주택-특례",
  },
  openGraph: {
    title: "상생임대주택 특례, 거주 안 해도 비과세 가능?",
    description: "직전계약 1년6개월 + 상생계약 2년, 임대료 5% 이내 → 거주요건 면제.",
    url: "https://www.jjyu.co.kr/w/상생임대주택-특례",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
