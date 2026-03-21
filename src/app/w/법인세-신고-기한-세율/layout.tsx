import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "법인세 신고 기한이 언제예요? 2026년 세율과 3월 신고 절차 정리 | 머니위키",
  description: "12월 결산 법인은 3월 31일까지 신고·납부해야 해요. 2026년부터 세율이 1%p 인상(10~25%)됐고, 기한 초과 시 가산세 20%가 붙어요. 홈택스 신고 절차를 단계별로 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/법인세-신고-기한-세율",
  },
  openGraph: {
    title: "법인세 신고 기한이 언제예요? 2026년 세율과 3월 신고 절차 정리",
    description: "12월 결산 법인은 3월 31일까지 신고·납부해야 해요. 2026년부터 세율이 1%p 인상됐어요.",
    url: "https://www.jjyu.co.kr/w/법인세-신고-기한-세율",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
