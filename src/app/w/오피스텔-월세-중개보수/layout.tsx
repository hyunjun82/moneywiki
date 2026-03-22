import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "오피스텔 월세 중개수수료는 얼마인가요? 수수료 상한과 계산 방법 | 머니위키",
  description: "오피스텔 중개수수료는 거래금액의 0.4% 이내(전월세), 0.5% 이내(매매)예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/오피스텔-월세-중개보수" },
  openGraph: { title: "오피스텔 월세 중개수수료는 얼마인가요? 수수료 상한과 계산 방법 | 머니위키", description: "오피스텔 중개수수료는 거래금액의 0.4% 이내(전월세), 0.5% 이내(매매)예요.", url: "https://www.jjyu.co.kr/w/오피스텔-월세-중개보수", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
