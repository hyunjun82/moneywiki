import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 기초일액 계산법 평균임금 60% 상한액 하한액 | 머니위키",
  description: "실업급여 기초일액은 퇴직 전 3개월 평균임금의 60%예요. 2026년 상한액 68,100원, 하한액 66,048원 기준과 급여수준별 적용방법을 정리했어요.",
  openGraph: {
    title: "실업급여 기초일액 계산법 평균임금 60% 상한액 하한액",
    description: "평균임금 60% 기초일액, 상한 68,100원·하한 66,048원 적용 기준. 월 급여별 예상 기초일액 체커 포함.",
    url: "https://jjyu.co.kr/w/실업급여-기초일액",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/실업급여-기초일액",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
