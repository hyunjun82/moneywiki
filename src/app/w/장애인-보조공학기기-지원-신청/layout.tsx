export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "장애인 보조공학기기 지원 신청: 지원 내용 및 신청 절차 총정리 | 머니위키",
  description: "장애인 보조공학기기 지원 신청 방법을 알려드려요. 중증 장애인은 최대 2,000만원까지 지원받을 수 있고, 무료 대여도 가능해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-보조공학기기-지원-신청" },
  openGraph: {
    title: "장애인 보조공학기기 지원 신청: 지원 내용 및 신청 절차 총정리",
    description: "장애인 보조공학기기 지원 신청 방법을 알려드려요. 중증 장애인은 최대 2,000만원까지 지원받을 수 있고, 무료 대여도 가능해요",
    url: "https://www.jjyu.co.kr/w/장애인-보조공학기기-지원-신청",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
