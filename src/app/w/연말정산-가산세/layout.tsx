import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 가산세, 얼마나 나올까? 종류별 세율과 줄이는 방법",
  description: "지급명세서 미제출 시 1% 가산세, 지연제출하면 0.5%로 반감돼요. 원천징수이행상황신고서 가산세, 제출기한, 줄이는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-가산세" },
  openGraph: {
    title: "연말정산 가산세, 얼마나 나올까? 종류별 세율과 줄이는 방법 | 머니위키",
    description: "지급명세서 미제출 시 1% 가산세, 지연제출하면 0.5%로 반감돼요. 원천징수이행상황신고서 가산세, 제출기한, 줄이는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-가산세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
