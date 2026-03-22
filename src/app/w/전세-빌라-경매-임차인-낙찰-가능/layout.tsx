import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세로 살고 있는 빌라 경매 낙찰받을 수 있나요 | 머니위키",
  description: "전세집이 경매로 넘어가면 임차인도 낙찰받을 수 있나요? 네, 가능해요. 낙찰받으면 임차인 지위는 소멸되고 소유권자가 돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세-빌라-경매-임차인-낙찰-가능" },
  openGraph: { title: "전세로 살고 있는 빌라 경매 낙찰받을 수 있나요 | 머니위키", description: "전세집이 경매로 넘어가면 임차인도 낙찰받을 수 있나요? 네, 가능해요. 낙찰받으면 임차인 지위는 소멸되고 소유권자가 돼요.", url: "https://www.jjyu.co.kr/w/전세-빌라-경매-임차인-낙찰-가능", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
