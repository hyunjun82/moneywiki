import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세금 경매 배당 | 머니위키",
  description: "경매 시 전세보증금 배당 순위와 절차를 알아봅니다. 배당요구 방법과 소액임차인 최우선변제를 정리합니다.",
  openGraph: { title: "전세금 경매 배당", description: "경매 시 전세보증금 배당 순위와 절차를 알아봅니다. 배당요구 방법과 소액임차인 최우선변제를 정리합니다.", url: "https://jjyu.co.kr/w/전세금-경매-배당" },
  alternates: { canonical: "https://jjyu.co.kr/w/전세금-경매-배당" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
