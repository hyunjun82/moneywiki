import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "명절 선물 한도, 청탁금지법 가액 기준과 처벌 | 머니위키",
  description: "일반 선물 5만원, 농수산물 명절 30만원 한도. 초과하면 과태료 2~5배, 100만원 넘으면 형사처벌. 청탁금지법 선물 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/명절-선물-청탁금지법-가액" },
  openGraph: {
    title: "명절 선물 한도, 청탁금지법 가액 기준과 처벌 | 머니위키",
    description: "일반 선물 5만원, 농수산물 명절 30만원 한도. 초과하면 과태료 2~5배, 100만원 넘으면 형사처벌.",
    url: "https://www.jjyu.co.kr/w/명절-선물-청탁금지법-가액",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
