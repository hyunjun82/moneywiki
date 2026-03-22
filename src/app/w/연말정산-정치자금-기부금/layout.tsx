import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 정치자금 기부금 | 머니위키",
  description: "정치자금 10만원 기부하면 약 9만원 돌려받아요. 실질 부담 1만원으로 정치 참여할 수 있어요",
  openGraph: { title: "연말정산 정치자금 기부금 | 머니위키", description: "정치자금 10만원 기부하면 약 9만원 돌려받아요. 실질 부담 1만원으로 정치 참여할 수 있어요", url: "https://www.jjyu.co.kr/w/연말정산-정치자금-기부금", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-정치자금-기부금" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
