export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애인 차별 구제 방법, 신고 절차와 법적 대응 | 머니위키",
  description: "국가인권위 진정(1331)부터 손해배상·형사 고소까지. 장애인차별금지법에 따른 구제 절차와 연락처를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-차별-구제-방법" },
  openGraph: {
    title: "장애인 차별 구제 방법, 신고 절차와 법적 대응 | 머니위키",
    description: "국가인권위 진정(1331)부터 손해배상·형사 고소까지. 장애인차별금지법에 따른 구제 절차와 연락처를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/장애인-차별-구제-방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
