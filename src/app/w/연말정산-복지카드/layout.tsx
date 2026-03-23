import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 복지카드 | 머니위키",
  description: "장애인 복지카드로 결제한 금액은 신용카드 소득공제를 받을 수 있어요. 일반 신용카드와 동일하게 15% 공제율이 적용돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-복지카드" },
  openGraph: {
    title: "연말정산 복지카드",
    description: "장애인 복지카드로 결제한 금액은 신용카드 소득공제를 받을 수 있어요. 일반 신용카드와 동일하게 15% 공제율이 적용돼요.",
    url: "https://www.jjyu.co.kr/w/연말정산-복지카드",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
