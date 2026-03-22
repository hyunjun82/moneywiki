import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받을 때 국민연금, 실업크레딧으로 가입기간 유지 | 머니위키",
  description: "실직 중 국민연금 보험료 75%를 지원받는 실업크레딧 제도예요. 신청 자격, 납부예외와의 차이, 고용센터 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-국민연금-납부유예" },
  openGraph: {
    title: "실업급여 받을 때 국민연금, 실업크레딧으로 가입기간 유지 | 머니위키",
    description: "실직 중 국민연금 보험료 75%를 지원받는 실업크레딧 제도예요. 신청 자격, 납부예외와의 차이, 고용센터 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-국민연금-납부유예",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
