import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 과다공제, 가산세 얼마? 자주 실수하는 사례와 대응 | 머니위키",
  description: "연말정산 과다공제, 가산세 얼마? 자주 실수하는 사례와 대응에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-과다공제-사례" },
  openGraph: { title: "연말정산 과다공제, 가산세 얼마? 자주 실수하는 사례와 대응", description: "연말정산 과다공제, 가산세 얼마? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-과다공제-사례", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
