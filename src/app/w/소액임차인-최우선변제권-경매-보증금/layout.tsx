import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "소액임차인 최우선변제권, 경매에서 보증금 얼마나 받나? 지역별 기준 | 머니위키",
  description: "전세 보증금이 경매로 날아갈까 걱정되시죠. 소액임차인이면 은행보다 먼저 보증금을 받을 수 있어요. 지역별 기준 금액과 배당요구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소액임차인-최우선변제권-경매-보증금" },
  openGraph: {
    title: "소액임차인 최우선변제권, 경매에서 보증금 얼마나 받나? 지역별 기준 | 머니위키",
    description: "전세 보증금이 경매로 날아갈까 걱정되시죠. 소액임차인이면 은행보다 먼저 보증금을 받을 수 있어요. 지역별 기준 금액과 배당요구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/소액임차인-최우선변제권-경매-보증금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
