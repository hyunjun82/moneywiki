import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인 공동 창업하면 자금을 얼마나 받을까? 표준사업장 지원금과 신청 방법 | 머니위키",
  description: "장애인 공동 창업 시 컨소시엄형 표준사업장으로 최대 10억 원까지 지원받을 수 있어요. 개인 창업 자금, 융자, 신청 절차와 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-공동-창업-자금-지원" },
  openGraph: {
    title: "장애인 공동 창업하면 자금을 얼마나 받을까? 표준사업장 지원금과 신청 방법 | 머니위키",
    description: "장애인 공동 창업 시 컨소시엄형 표준사업장으로 최대 10억 원까지 지원받을 수 있어요. 개인 창업 자금, 융자, 신청 절차와 필요 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/장애인-공동-창업-자금-지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
