import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "두루누리 사회보험료 지원 대상과 신청 방법, 최대 80% 지원받는 방법",
  description: "두루누리 사회보험료 지원 대상 조건(10인 미만, 월 270만 원 이하)과 신청 절차를 정리했어요. 고용보험·국민연금 보험료 최대 80%를 사업주·근로자 모두 지원받아요.",
  openGraph: {
    title: "두루누리 사회보험료 지원 대상과 신청 방법, 최대 80% 지원받는 방법 | 머니위키",
    description: "두루누리 사회보험료 지원 대상 조건과 신청 절차를 정리했어요. 사업주·근로자 모두 최대 80% 지원받아요.",
    url: "https://www.jjyu.co.kr/w/두루누리-사회보험료-지원-대상-신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/두루누리-사회보험료-지원-대상-신청" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
