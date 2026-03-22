import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 현금영수증 공제 — 공제율 30%와 활용 전략 | 머니위키",
  description: "현금영수증은 30% 소득공제율로 신용카드(15%)의 2배예요. 총급여 25% 초과 후 전략적 사용법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-현금영수증" },
  openGraph: { title: "연말정산 현금영수증 공제 — 공제율 30%와 활용 전략", description: "결제 수단별 공제율 비교와 절세 전략.", url: "https://www.jjyu.co.kr/w/연말정산-현금영수증", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
