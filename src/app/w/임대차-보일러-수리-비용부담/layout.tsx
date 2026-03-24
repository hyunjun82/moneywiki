import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임대차 보일러 수리 비용 부담 임대인 임차인 | 머니위키",
  description: "전세나 월세 집에서 보일러가 고장났을 때 수리비는 누가 부담하나요? 원칙적으로 집주인이 내지만 과실 여부에 따라 달라져요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대차-보일러-수리-비용부담" },
  openGraph: {
    title: "임대차 보일러 수리 비용 부담 임대인 임차인",
    description: "전세나 월세 집에서 보일러가 고장났을 때 수리비는 누가 부담하나요? 원칙적으로 집주인이 내지만 과실 여부에 따라 달라져요.",
    url: "https://www.jjyu.co.kr/w/임대차-보일러-수리-비용부담",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
