import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택연금 3월 달라지는점 신청 전 확인사항 | 머니위키",
  description: "2026년 3월부터 주택연금 수령액이 3.13% 인상된다는 거 아시나요? 초기보증료도 1.5%에서 1.0%로 낮아지고, 우대형 혜택도 확대돼요",
  openGraph: { title: "주택연금 3월 달라지는점 신청 전 확인사항 | 머니위키", description: "2026년 3월부터 주택연금 수령액이 3.13% 인상된다는 거 아시나요? 초기보증료도 1.5%에서 1.0%로 낮아지고, 우대형 혜택도 확대돼요", url: "https://www.jjyu.co.kr/w/주택연금-3월-신청-달라지는점", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택연금-3월-신청-달라지는점" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
