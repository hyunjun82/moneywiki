import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 신용카드 소득공제 계산 | 머니위키",
  description: "연봉 5천만원에 카드 2천만원 썼으면 최대 45만원 돌려받아요. 25% 초과분부터 공제돼요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-신용카드-소득공제-계산" },
  openGraph: { title: "연말정산 신용카드 소득공제 계산 | 머니위키", description: "연봉 5천만원에 카드 2천만원 썼으면 최대 45만원 돌려받아요. 25% 초과분부터 공제돼요", url: "https://www.jjyu.co.kr/w/연말정산-신용카드-소득공제-계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
