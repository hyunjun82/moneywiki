import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상가 임대차 보증금 반환 시기 | 머니위키",
  description: "상가 계약 끝났는데 새 세입자 올 때까지 보증금 못 받는다고요? 바로 이사해도 되는지 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가-임대차-보증금-반환" },
  openGraph: { title: "상가 임대차 보증금 반환 시기 | 머니위키", description: "상가 계약 끝났는데 새 세입자 올 때까지 보증금 못 받는다고요? 바로 이사해도 되는지 알려드릴게요.", url: "https://www.jjyu.co.kr/w/상가-임대차-보증금-반환", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
