import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재산세 얼마나 나올까? 세율·계산법·납부기한 정리 | 머니위키",
  description: "재산세는 공시가격에 공정시장가액비율(60%)을 곱한 과세표준에 0.1~0.4% 세율을 적용해요. 주택 7월·9월 납부, 1세대1주택 감면, 계산 예시까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재산세" },
  openGraph: {
    title: "재산세 얼마나 나올까? 세율·계산법·납부기한 정리 | 머니위키",
    description: "재산세는 공시가격에 공정시장가액비율(60%)을 곱한 과세표준에 0.1~0.4% 세율을 적용해요. 주택 7월·9월 납부, 1세대1주택 감면, 계산 예시까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/재산세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
