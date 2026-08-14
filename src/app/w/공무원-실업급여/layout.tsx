import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "공무원 퇴직하면 실업급여? 퇴직급여 종류와 금액 비교",
  description: "공무원은 고용보험 적용 제외라 실업급여를 못 받아요. 대신 공무원연금에서 퇴직급여, 퇴직수당, 명예퇴직수당을 받을 수 있죠. 임기제공무원 예외와 민간 전직 시 수급 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공무원-실업급여" },
  openGraph: {
    title: "공무원 퇴직하면 실업급여? 퇴직급여 종류와 금액 비교 | 머니위키",
    description: "공무원은 고용보험 적용 제외라 실업급여를 못 받아요. 대신 공무원연금에서 퇴직급여, 퇴직수당, 명예퇴직수당을 받을 수 있죠. 임기제공무원 예외와 민간 전직 시 수급 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/공무원-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
