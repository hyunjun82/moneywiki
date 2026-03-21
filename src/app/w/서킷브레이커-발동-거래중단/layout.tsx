import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "서킷브레이커 발동 기준과 거래 중단 규칙 | 머니위키",
  description: "서킷브레이커 3단계 발동 기준, 거래 중단 시간, 사이드카와 차이, 투자자 대응 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/서킷브레이커-발동-거래중단" },
  openGraph: {
    title: "서킷브레이커 발동 기준과 거래 중단 규칙 | 머니위키",
    description: "서킷브레이커 3단계 발동 기준, 거래 중단 시간, 사이드카와 차이를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/서킷브레이커-발동-거래중단",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
