import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "편의점 아르바이트 산재보험 — 적용 대상과 신청 방법 | 머니위키",
  description: "편의점 알바도 산재보험이 적용돼요. 1명 이상 사업장의 모든 근로자가 대상이고, 점주가 미가입이어도 보상받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산재보험-편의점-아르바이트-적용" },
  openGraph: {
    title: "편의점 아르바이트 산재보험 — 적용 대상과 신청 방법",
    description: "알바 산재보험 적용 기준과 신청 절차 정리.",
    url: "https://www.jjyu.co.kr/w/산재보험-편의점-아르바이트-적용",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
