import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 수급조건 피보험기간 180일 | 비자발적 퇴사 자격요건",
  description: "실업급여를 받으려면 고용보험 피보험기간 180일이 필요하다는 거 아시나요? 비자발적 퇴사 기준부터 자발적 퇴사 예외 인정 사유까지, 수급조건과 자격요건을 정리했어요. 여러 직장 합산 방법도 알려드려요.",
  openGraph: { title: "실업급여 수급조건 피보험기간 180일 | 비자발적 퇴사 자격요건 | 머니위키", description: "실업급여를 받으려면 고용보험 피보험기간 180일이 필요하다는 거 아시나요? 비자발적 퇴사 기준부터 자발적 퇴사 예외 인정 사유까지, 수급조건과 자격요건을 정리했어요. 여러 직장 합", url: "https://www.jjyu.co.kr/w/실업급여-수급-조건", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급-조건" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
