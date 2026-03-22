import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "소액연체 신용사면, 292만명 신용점수 회복 방법 | 머니위키",
  description: "5천만원 이하 연체를 전액 상환하면 연체 이력이 즉시 삭제돼요. 대상 조건 확인부터 신용점수 조회, 금융거래 재개까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/소액연체-신용사면" },
  openGraph: {
    title: "소액연체 신용사면, 292만명 신용점수 회복 방법 | 머니위키",
    description: "5천만원 이하 연체를 전액 상환하면 연체 이력이 즉시 삭제돼요. 대상 조건 확인부터 신용점수 조회, 금융거래 재개까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/소액연체-신용사면",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
