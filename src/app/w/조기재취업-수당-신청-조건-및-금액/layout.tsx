import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "조기재취업수당 지급 조건 및 신청 방법 | 머니위키",
  description: "조기재취업 수당은 실업급여 수급 중 빨리 취업하면 받는 급여입니다. 신청 조건과 금액을 안내합니다.",
  openGraph: { title: "조기재취업수당 지급 조건 및 신청 방법", description: "조기재취업 수당은 실업급여 수급 중 빨리 취업하면 받는 급여입니다. 신청 조건과 금액을 안내합니다.", url: "https://jjyu.co.kr/w/조기재취업-수당-신청-조건-및-금액" },
  alternates: { canonical: "https://jjyu.co.kr/w/조기재취업-수당-신청-조건-및-금액" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
