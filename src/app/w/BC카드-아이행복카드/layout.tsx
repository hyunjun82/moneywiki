import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "BC카드 아이행복카드 — 12개 은행 발급 방법과 주의사항 | 머니위키",
  description: "BC카드 아이행복카드는 12개 은행에서 발급 가능해요. 연회비 무료, 보육료 결제 기능 설정까지 발급 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/BC카드-아이행복카드" },
  openGraph: {
    title: "BC카드 아이행복카드 — 12개 은행 발급 방법과 주의사항 | 머니위키",
    description: "BC카드 아이행복카드는 12개 은행에서 발급 가능해요. 연회비 무료, 보육료 결제 기능 설정까지 발급 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/BC카드-아이행복카드",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
