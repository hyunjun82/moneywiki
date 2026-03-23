import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농지보전부담금 요율 계산 방법 | 머니위키",
  description: "농업진흥지역 30%, 비농업진흥지역 20%, 상한 5만원/㎡. 계산 예시와 납부 절차, 감면·면제 대상 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지전용-농지보전부담금-요율" },
  openGraph: {
    title: "농지보전부담금 요율 계산 방법",
    description: "농업진흥 30% vs 비농업 20%. 계산 예시와 납부 방법.",
    url: "https://www.jjyu.co.kr/w/농지전용-농지보전부담금-요율",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
