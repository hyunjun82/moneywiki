import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연금저축 수익률 비교, 펀드형 vs 보험형",
  description: "2025년 3분기 기준 미래에셋 14.9%, 보험사 2~3%예요. 은퇴 시점에 따라 펀드형/보험형 선택법, 수수료 비교, 계좌이체 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연금저축-수익률-비교" },
  openGraph: {
    title: "연금저축 수익률 비교, 펀드형 vs 보험형 | 머니위키",
    description: "2025년 3분기 기준 미래에셋 14.9%, 보험사 2~3%예요. 은퇴 시점에 따라 펀드형/보험형 선택법, 수수료 비교, 계좌이체 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연금저축-수익률-비교",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
