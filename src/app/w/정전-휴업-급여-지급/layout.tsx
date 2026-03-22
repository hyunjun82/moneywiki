import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "정전으로 일 못 하면 급여를 받나요? 휴업 급여 지급 기준 | 머니위키",
  description: "사업주 귀책이 아닌 정전이라도 휴업수당(평균임금 70%)을 받을 수 있어요. 근로기준법 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/정전-휴업-급여-지급" },
  openGraph: { title: "정전으로 일 못 하면 급여를 받나요? 휴업 급여 지급 기준 | 머니위키", description: "사업주 귀책이 아닌 정전이라도 휴업수당(평균임금 70%)을 받을 수 있어요. 근로기준법 기준을 정리했어요.", url: "https://www.jjyu.co.kr/w/정전-휴업-급여-지급", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
