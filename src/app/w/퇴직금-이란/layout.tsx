import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금이란 무엇일까? 법적 정의와 수급 조건",
  description: "퇴직금이란 근로자퇴직급여보장법 제8조에 따라 사업주가 퇴직하는 근로자에게 지급하는 급여입니다. 퇴직금의 법적 정의, 퇴직연금과의 차이, 의무 여부, 계산 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-이란" },
  openGraph: {
    title: "퇴직금이란 무엇일까? 법적 정의와 수급 조건 | 머니위키",
    description: "퇴직금이란 근로자퇴직급여보장법 제8조에 따라 사업주가 퇴직하는 근로자에게 지급하는 급여입니다.",
    url: "https://www.jjyu.co.kr/w/퇴직금-이란",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
