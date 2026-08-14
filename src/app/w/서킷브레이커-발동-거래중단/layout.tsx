import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "서킷브레이커 발동 조건과 거래중단 시간",
  description: "코스피·코스닥이 8% 이상 급락하면 20분 거래가 중단돼요. 서킷브레이커 발동 조건, 단계별 거래중단 시간, 실제 발동 사례를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/서킷브레이커-발동-거래중단" },
  openGraph: {
    title: "서킷브레이커 발동 조건과 거래중단 시간 | 머니위키",
    description: "코스피·코스닥이 8% 이상 급락하면 20분 거래가 중단돼요. 서킷브레이커 발동 조건, 단계별 거래중단 시간, 실제 발동 사례를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/서킷브레이커-발동-거래중단",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
