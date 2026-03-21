import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매로 집 샀는데 전 주인이 안 나가요 인도명령 신청부터 강제집행까지 | 머니위키",
  description: "경매 낙찰 후 전 주인이 안 나가면 매각대금 납부 6개월 이내에 인도명령을 신청하세요. 비용 1만원, 소요 2~4주. 기한 넘기면 명도소송(3~6개월, 100만원 이상)으로 가야 해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/경매로-집-샀는데-전-주인-안-나가요-인도명령",
  },
  openGraph: {
    title: "경매로 집 샀는데 전 주인이 안 나가요 인도명령 신청부터 강제집행까지",
    description: "인도명령은 6개월 이내, 비용 1만원, 2~4주면 해결. 놓치면 명도소송 필요.",
    url: "https://www.jjyu.co.kr/w/경매로-집-샀는데-전-주인-안-나가요-인도명령",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
