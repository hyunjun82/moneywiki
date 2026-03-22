import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "롯데카드 아이행복카드, 어떤 혜택이 있나요? 할인 영역과 발급 방법 | 머니위키",
  description: "롯데카드 아이행복카드는 육아용품·병원·어린이집 할인 혜택이 있어요. 연회비 무료예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/롯데카드-아이행복카드" },
  openGraph: { title: "롯데카드 아이행복카드, 어떤 혜택이 있나요? 할인 영역과 발급 방법 | 머니위키", description: "롯데카드 아이행복카드는 육아용품·병원·어린이집 할인 혜택이 있어요. 연회비 무료예요.", url: "https://www.jjyu.co.kr/w/롯데카드-아이행복카드", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
