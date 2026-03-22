import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "정전 휴업 급여 지급 휴업수당 | 머니위키",
  description: "정전으로 근무를 못하면 급여를 받을 수 있나요? 정전 휴업 시 급여 지급 기준과 휴업수당을 알려드릴게요.",
  openGraph: { title: "정전 휴업 급여 지급 휴업수당 | 머니위키", description: "정전으로 근무를 못하면 급여를 받을 수 있나요? 정전 휴업 시 급여 지급 기준과 휴업수당을 알려드릴게요.", url: "https://www.jjyu.co.kr/w/정전-휴업-급여-지급-휴업수당", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/정전-휴업-급여-지급-휴업수당" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
