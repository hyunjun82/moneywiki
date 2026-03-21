import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 부모급여, 0세 100만원·1세 50만원 — 신청방법·어린이집 차액까지 | 머니위키",
  description: "2026년 부모급여 0세 월 100만원, 1세 월 50만원. 어린이집 이용 시 차액 계산, 60일 이내 소급 신청, 온라인 신청방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026-부모급여-금액-신청방법" },
  openGraph: {
    title: "2026년 부모급여, 0세 100만원·1세 50만원 — 신청방법·어린이집 차액까지 | 머니위키",
    description: "2026년 부모급여 0세 월 100만원, 1세 월 50만원. 어린이집 이용 시 차액 계산, 60일 이내 소급 신청, 온라인 신청방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2026-부모급여-금액-신청방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
