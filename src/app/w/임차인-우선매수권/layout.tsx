import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임차인 우선매수권 | 머니위키",
  description: "경매 시 임차인 우선매수권의 의미와 행사 방법을 알아봅니다. 우선매수 신고 절차와 조건을 정리합니다.",
  openGraph: { title: "임차인 우선매수권 | 머니위키", description: "경매 시 임차인 우선매수권의 의미와 행사 방법을 알아봅니다. 우선매수 신고 절차와 조건을 정리합니다.", url: "https://www.jjyu.co.kr/w/임차인-우선매수권", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/임차인-우선매수권" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
