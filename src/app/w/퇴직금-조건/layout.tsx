import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 받을 수 있는 조건, 어떻게 되나요? | 머니위키",
  description: "퇴직금 수급 조건은 1년 이상 근무, 주 평균 15시간 이상 근로입니다. 계약직, 아르바이트, 자발적 퇴사 시에도 조건만 충족하면 퇴직금을 받을 수 있습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-조건" },
  openGraph: {
    title: "퇴직금 받을 수 있는 조건, 어떻게 되나요? | 머니위키",
    description: "퇴직금 수급 조건은 1년 이상 근무, 주 평균 15시간 이상 근로입니다. 계약직, 아르바이트, 자발적 퇴사 시에도 조건만 충족하면 받을 수 있습니다.",
    url: "https://www.jjyu.co.kr/w/퇴직금-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
