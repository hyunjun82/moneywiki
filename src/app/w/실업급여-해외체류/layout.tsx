import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받으면서 해외여행 가능할까? 42일 기준과 수급 재개 조건",
  description: "실업급여 수급 중 해외체류 시 급여가 정지되지만 귀국하면 재개돼요. 42일 최대 기간, 부정수급 주의사항, 실업인정일 변경 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-해외체류" },
  openGraph: {
    title: "실업급여 받으면서 해외여행 가능할까? 42일 기준과 수급 재개 조건 | 머니위키",
    description: "실업급여 수급 중 해외체류 시 급여가 정지되지만 귀국하면 재개돼요. 42일 최대 기간, 부정수급 주의사항, 실업인정일 변경 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-해외체류",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
