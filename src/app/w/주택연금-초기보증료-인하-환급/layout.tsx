import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주택연금 초기보증료, 얼마나 줄었나요? 1.0% 인하 내용과 5년 환급 규정 | 머니위키",
  description: "2026년 3월부터 주택연금 초기보증료가 1.5%에서 1.0%로 인하됐어요. 4억원 기준 200만원 절감되고, 환급 기간은 3년에서 5년으로 확대. 월 수령액도 4만원 늘어나요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/주택연금-초기보증료-인하-환급",
  },
  openGraph: {
    title: "주택연금 초기보증료, 얼마나 줄었나요? 1.0% 인하 내용과 5년 환급 규정",
    description: "초기보증료 1.5%→1.0% 인하, 환급 기간 3년→5년 확대. 4억 기준 200만원 절감.",
    url: "https://www.jjyu.co.kr/w/주택연금-초기보증료-인하-환급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
