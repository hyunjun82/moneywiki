import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "휴대폰 소액결제 한도 변경 2026 | 머니위키",
  description: "휴대폰 소액결제 한도는 최대 100만원인데요. 통신사별 한도 변경 방법 알려드려요.",
  openGraph: { title: "휴대폰 소액결제 한도 변경 2026 | 머니위키", description: "휴대폰 소액결제 한도는 최대 100만원인데요. 통신사별 한도 변경 방법 알려드려요.", url: "https://www.jjyu.co.kr/w/휴대폰-소액결제-한도", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/휴대폰-소액결제-한도" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
