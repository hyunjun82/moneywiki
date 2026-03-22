import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기준경비율 vs 단순경비율 — 적용 기준과 계산 방법 차이 | 머니위키",
  description: "프리랜서 2,400만원 미만이면 단순경비율, 이상이면 기준경비율이 적용돼요. 계산 공식 차이와 증빙 관리 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기준경비율-단순경비율" },
  openGraph: {
    title: "기준경비율 vs 단순경비율 — 적용 기준과 계산 방법 차이 | 머니위키",
    description: "프리랜서 2,400만원 미만이면 단순경비율, 이상이면 기준경비율이 적용돼요.",
    url: "https://www.jjyu.co.kr/w/기준경비율-단순경비율",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
