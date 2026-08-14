import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "공무원 퇴직금, 일반 직장인이랑 어떻게 다른가요?",
  description: "공무원은 퇴직금 대신 퇴직급여(퇴직수당+연금)를 받아요. 일반 직장인 퇴직금과의 차이점, 계산법, 수령 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공무원-퇴직금" },
  openGraph: {
    title: "공무원 퇴직금, 일반 직장인이랑 어떻게 다른가요? | 머니위키",
    description: "공무원은 퇴직금 대신 퇴직급여(퇴직수당+연금)를 받아요. 일반 직장인 퇴직금과의 차이점, 계산법, 수령 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/공무원-퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
