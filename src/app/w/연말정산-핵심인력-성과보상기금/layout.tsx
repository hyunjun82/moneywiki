import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 핵심인력 성과보상기금 | 머니위키",
  description: "중소기업 핵심인력이 성과보상기금을 받으면 50% 소득세 감면이에요. 5년 이상 근무 시 수령하는 성과보상금이 대상이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-핵심인력-성과보상기금" },
  openGraph: {
    title: "연말정산 핵심인력 성과보상기금",
    description: "중소기업 핵심인력이 성과보상기금을 받으면 50% 소득세 감면이에요. 5년 이상 근무 시 수령하는 성과보상금이 대상이에요.",
    url: "https://www.jjyu.co.kr/w/연말정산-핵심인력-성과보상기금",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
