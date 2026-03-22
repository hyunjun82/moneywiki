import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "최저임금보다 적게 받고 있다면? 처벌 수위와 진정 방법 | 머니위키",
  description: "최저임금 미만 지급 시 사업주는 3년 이하 징역 또는 2,000만원 이하 벌금에 처해져요. 고용노동부에 진정을 넣으면 근로감독관이 사업장을 조사하고 미지급 임금을 받아낼 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/최저임금-미만-지급-처벌",
  },
  openGraph: {
    title: "최저임금보다 적게 받고 있다면? 처벌 수위와 진정 방법",
    description: "3년 이하 징역 또는 2,000만원 벌금. 고용노동부 진정 절차 안내.",
    url: "https://www.jjyu.co.kr/w/최저임금-미만-지급-처벌",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
