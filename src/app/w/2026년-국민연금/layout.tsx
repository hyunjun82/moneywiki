import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 국민연금, 뭐가 달라졌나요? 보험료율 인상과 소득대체율",
  description: "2026년 국민연금 보험료율 9.5%로 인상, 소득대체율 43%로 변경됐어요. 월급별 보험료 비교와 2033년까지 인상 로드맵을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026년-국민연금" },
  openGraph: {
    title: "2026년 국민연금, 뭐가 달라졌나요? 보험료율 인상과 소득대체율 | 머니위키",
    description: "2026년 국민연금 보험료율 9.5%로 인상, 소득대체율 43%로 변경됐어요. 월급별 보험료 비교와 2033년까지 인상 로드맵을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2026년-국민연금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
