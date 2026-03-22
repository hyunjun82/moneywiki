import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이사비용, 평수별로 얼마나 들까? 포장이사 평균 가격과 절약법 | 머니위키",
  description: "원룸 30~50만원, 아파트 30평대 100~150만원이에요. 포장이사·반포장이사 비교, 절약 팁, 견적 시 확인사항까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이사비용-평균-가격" },
  openGraph: {
    title: "이사비용, 평수별로 얼마나 들까? 포장이사 평균 가격과 절약법 | 머니위키",
    description: "원룸 30~50만원, 아파트 30평대 100~150만원이에요. 포장이사·반포장이사 비교, 절약 팁, 견적 시 확인사항까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이사비용-평균-가격",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
