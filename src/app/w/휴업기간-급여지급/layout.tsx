import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "휴업기간 급여지급 기준 방법 | 머니위키",
  description: "회사 사정으로 휴업하면 급여는 어떻게 받나요? 휴업기간 중 급여 지급 기준을 알려드릴게요.",
  openGraph: { title: "휴업기간 급여지급 기준 방법 | 머니위키", description: "회사 사정으로 휴업하면 급여는 어떻게 받나요? 휴업기간 중 급여 지급 기준을 알려드릴게요.", url: "https://www.jjyu.co.kr/w/휴업기간-급여지급", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/휴업기간-급여지급" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
