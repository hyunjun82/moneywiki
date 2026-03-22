import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종합소득세 환급 조회 신청 2026 | 머니위키",
  description: "종소세 환급금은 6월 말~7월 초에 받아요. 조회부터 환급 시기까지 알려드릴게요.",
  openGraph: { title: "종합소득세 환급 조회 신청 2026 | 머니위키", description: "종소세 환급금은 6월 말~7월 초에 받아요. 조회부터 환급 시기까지 알려드릴게요.", url: "https://www.jjyu.co.kr/w/종합소득세-환급-신청", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/종합소득세-환급-신청" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
