import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "지방세 납부 기한, 세목별 일정과 가산금 기준 | 머니위키",
  description: "재산세, 자동차세, 취득세 등 지방세 납부 기한과 월별 일정, 가산금 기준, 납부 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지방세-납부-기한" },
  openGraph: {
    title: "지방세 납부 기한, 세목별 일정과 가산금 기준 | 머니위키",
    description: "재산세, 자동차세, 취득세 등 지방세 납부 기한과 월별 일정, 가산금 기준, 납부 방법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/지방세-납부-기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
