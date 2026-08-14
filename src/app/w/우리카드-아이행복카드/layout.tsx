import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "우리카드 아이행복카드: 발급 및 혜택 상세 안내",
  description: "우리카드 아이행복카드는 병원, 약국, 대중교통 할인까지 폭넓게 지원한다는 거 아시나요? 신규 발급 제한 정보와 대체 카드까지 알려드려요",
  openGraph: { title: "우리카드 아이행복카드: 발급 및 혜택 상세 안내 | 머니위키", description: "우리카드 아이행복카드는 병원, 약국, 대중교통 할인까지 폭넓게 지원한다는 거 아시나요? 신규 발급 제한 정보와 대체 카드까지 알려드려요", url: "https://www.jjyu.co.kr/w/우리카드-아이행복카드", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/우리카드-아이행복카드" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
