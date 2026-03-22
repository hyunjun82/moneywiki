import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상가가 경매에 넘어가면 보증금을 돌려받을 수 있나요? 소액임차인 우선변제 조건 | 머니위키",
  description: "소액임차인은 경매 배당에서 최우선으로 보증금을 돌려받아요. 지역별 보증금 기준이 다르에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가-경매-소액임차인-우선변제" },
  openGraph: { title: "상가가 경매에 넘어가면 보증금을 돌려받을 수 있나요? 소액임차인 우선변제 조건 | 머니위키", description: "소액임차인은 경매 배당에서 최우선으로 보증금을 돌려받아요. 지역별 보증금 기준이 다르에요.", url: "https://www.jjyu.co.kr/w/상가-경매-소액임차인-우선변제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
