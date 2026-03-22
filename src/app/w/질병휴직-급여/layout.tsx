import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "질병휴직 중에 급여가 나올까? 지급 기준과 받을 수 있는 수당 | 머니위키",
  description: "질병휴직은 법정 휴직이 아니라 대부분 무급이에요. 상병수당, 건강보험, 민간보험으로 소득을 보전할 수 있는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/질병휴직-급여" },
  openGraph: {
    title: "질병휴직 중에 급여가 나올까? 지급 기준과 받을 수 있는 수당 | 머니위키",
    description: "질병휴직 급여 지급 여부, 상병수당 신청, 4대보험 처리, 산재휴직과의 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/질병휴직-급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
