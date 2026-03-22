import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년도약계좌 | 머니위키",
  description: "청년도약계좌 가입 조건과 혜택을 알아봅니다. 정부 기여금, 비과세 혜택, 신청 방법을 정리합니다.",
  openGraph: { title: "청년도약계좌 | 머니위키", description: "청년도약계좌 가입 조건과 혜택을 알아봅니다. 정부 기여금, 비과세 혜택, 신청 방법을 정리합니다.", url: "https://www.jjyu.co.kr/w/청년도약계좌", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년도약계좌" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
