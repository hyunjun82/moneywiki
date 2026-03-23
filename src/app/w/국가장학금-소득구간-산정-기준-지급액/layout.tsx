import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국가장학금 소득구간 산정 기준: 1학기 지급액 총정리 | 머니위키",
  description: "국가장학금을 받으려면 소득구간 산정이 중요해요. 건강보험료 기준, 구간별 지급액, 신청 방법을 자세히 알려드릴게요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국가장학금-소득구간-산정-기준-지급액" },
  openGraph: {
    title: "국가장학금 소득구간 산정 기준: 1학기 지급액 총정리",
    description: "국가장학금을 받으려면 소득구간 산정이 중요해요. 건강보험료 기준, 구간별 지급액, 신청 방법을 자세히 알려드릴게요",
    url: "https://www.jjyu.co.kr/w/국가장학금-소득구간-산정-기준-지급액",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
