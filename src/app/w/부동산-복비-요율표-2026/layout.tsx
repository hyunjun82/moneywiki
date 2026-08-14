import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부동산 복비 요율표 2026, 매매·전세·월세 계산법",
  description: "2026년 주택 매매 복비는 0.4~0.7%, 전세는 0.3~0.6%예요. 상한요율 이하 협의 가능하고, 월세 환산보증금 계산법도 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산-복비-요율표-2026" },
  openGraph: {
    title: "부동산 복비 요율표 2026, 매매·전세·월세 계산법 | 머니위키",
    description: "2026년 주택 매매 복비는 0.4~0.7%, 전세는 0.3~0.6%예요. 상한요율 이하 협의 가능하고, 월세 환산보증금 계산법도 정리했어요.",
    url: "https://www.jjyu.co.kr/w/부동산-복비-요율표-2026",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
