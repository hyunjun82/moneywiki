import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "소액임차인 최우선변제권 한도 금액 지역별 기준 | 머니위키",
  description: "경매 시 저당권보다 먼저 보증금을 돌려받을 수 있어요. 서울 1.65억 이하면 5,500만원까지 최우선 변제받아요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소액임차인-최우선변제권" },
  openGraph: { title: "소액임차인 최우선변제권 한도 금액 지역별 기준", description: "경매 시 저당권보다 먼저 보증금을 돌려받을 수 있어요. 서울 1.65억 이하면 5,500만원까지 최우선 변제받아요", url: "https://www.jjyu.co.kr/w/소액임차인-최우선변제권", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
