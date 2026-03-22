import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전월세상한제 폐지됐을까? 2026년 현황과 대비 방법 | 머니위키",
  description: "2026년 3월 현재 전월세상한제는 폐지되지 않았어요. 갱신 시 5% 상한이 여전히 적용되고, 폐지 시 달라지는 점과 대비 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전월세상한제-폐지" },
  openGraph: {
    title: "전월세상한제 폐지됐을까? 2026년 현황과 대비 방법 | 머니위키",
    description: "전월세상한제 폐지 논의가 있지만 2026년 3월 현재 법은 바뀌지 않았어요. 5% 상한 유지 현황과 대비 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/전월세상한제-폐지",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
