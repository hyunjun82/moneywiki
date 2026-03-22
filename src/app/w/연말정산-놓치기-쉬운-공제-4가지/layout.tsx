import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 놓치기 쉬운 공제 4가지, 간소화에 안 잡히는 항목 | 머니위키",
  description: "중소기업 소득세 90% 감면, 기부금 10년 이월공제, 육아휴직 배우자 공제, 오피스텔 월세 세액공제. 간소화에 안 잡히는 공제를 챙기세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-놓치기-쉬운-공제-4가지" },
  openGraph: {
    title: "연말정산 놓치기 쉬운 공제 4가지, 간소화에 안 잡히는 항목 | 머니위키",
    description: "중소기업 소득세 90% 감면, 기부금 10년 이월공제, 육아휴직 배우자 공제, 오피스텔 월세 세액공제.",
    url: "https://www.jjyu.co.kr/w/연말정산-놓치기-쉬운-공제-4가지",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
