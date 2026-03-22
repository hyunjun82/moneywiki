import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "KB국민카드 아이행복카드: 발급 방법 및 혜택 완벽 가이드 | 머니위키",
  description: "KB국민카드 아이행복카드는 체크카드와 신용카드 선택 폭이 넓고 캐시백 혜택이 있다는 거 아시나요? 발급 방법과 생활 할인까지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/KB국민카드-아이행복카드" },
  openGraph: {
    title: "KB국민카드 아이행복카드: 발급 방법 및 혜택 완벽 가이드",
    description: "KB국민카드 아이행복카드는 체크카드와 신용카드 선택 폭이 넓고 캐시백 혜택이 있다는 거 아시나요? 발급 방법과 생활 할인까지 알려드려요",
    url: "https://www.jjyu.co.kr/w/KB국민카드-아이행복카드",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
