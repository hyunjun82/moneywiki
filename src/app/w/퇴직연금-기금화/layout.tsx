import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 기금화, 내 연금이 어떻게 바뀌나요? | 머니위키",
  description: "개별 운용을 통합 기금으로 바꿔서 수익률을 높이는 제도예요. 기금화 핵심과 시행 일정, 기존 적립금 처리 방식을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-기금화" },
  openGraph: {
    title: "퇴직연금 기금화, 내 연금이 어떻게 바뀌나요? | 머니위키",
    description: "개별 운용을 통합 기금으로 바꿔서 수익률을 높이는 제도예요. 기금화 핵심과 시행 일정, 기존 적립금 처리 방식을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-기금화",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
