import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농촌 빈집 철거 비용 지원 — 대상 조건과 신청 방법",
  description: "농촌 빈집 철거 비용의 50~100%를 지자체에서 지원받을 수 있어요. 호당 최대 5천만원까지 가능한 대상 조건과 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농촌-빈집-철거-비용-지원" },
  openGraph: {
    title: "농촌 빈집 철거 비용 지원 — 대상 조건과 신청 방법",
    description: "빈집 판정 요건, 지원 금액, 신청 서류까지 한번에 확인하세요.",
    url: "https://www.jjyu.co.kr/w/농촌-빈집-철거-비용-지원",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
