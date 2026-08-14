import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "NH농협 아이행복카드 10% 할인 혜택과 발급 방법",
  description: "어린이집·병원·온라인쇼핑 10% 할인, 연회비 무료. NH농협카드 아이행복카드 혜택과 발급 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/NH농협카드-아이행복카드" },
  openGraph: {
    title: "NH농협 아이행복카드 10% 할인 혜택과 발급 방법 | 머니위키",
    description: "어린이집·병원·온라인쇼핑 10% 할인, 연회비 무료. NH농협카드 아이행복카드 혜택과 발급 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/NH농협카드-아이행복카드",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
