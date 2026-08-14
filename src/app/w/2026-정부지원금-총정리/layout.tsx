import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 정부지원금 종류와 신청방법, 보조금24로 한 번에 조회하기",
  description: "2026년 기준 중위소득 6.51% 인상으로 혜택 대상이 늘었어요. 주요 지원금 종류와 보조금24 사용 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026-정부지원금-총정리" },
  openGraph: {
    title: "2026년 정부지원금 종류와 신청방법, 보조금24로 한 번에 조회하기 | 머니위키",
    description: "2026년 기준 중위소득 6.51% 인상으로 혜택 대상이 늘었어요. 주요 지원금 종류와 보조금24 사용 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2026-정부지원금-총정리",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
