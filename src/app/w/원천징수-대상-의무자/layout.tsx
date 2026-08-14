import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "원천징수 대상 소득 8가지와 의무자, 세율 정리",
  description: "원천징수 대상은 근로·사업·이자·배당·기타·퇴직·연금·일용소득 8가지예요. 소득유형별 세율과 신고 방법을 정리했어요.",
  openGraph: { title: "원천징수 대상 소득 8가지와 의무자, 세율 정리 | 머니위키", description: "원천징수 대상 소득과 세율 정리예요.", url: "https://www.jjyu.co.kr/w/원천징수-대상-의무자", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/원천징수-대상-의무자" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
