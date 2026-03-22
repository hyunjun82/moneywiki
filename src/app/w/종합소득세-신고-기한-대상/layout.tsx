import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "종합소득세 신고 기한·대상·세율·방법 2026 | 머니위키",
  description: "2025년 귀속 종합소득세 신고 기한은 2026년 6월 1일까지예요. 신고 대상, 세율 구간, 홈택스 신고 절차, 가산세까지 한번에 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/종합소득세-신고-기한-대상" },
  openGraph: {
    title: "종합소득세 신고 기한·대상·세율·방법 2026 | 머니위키",
    description: "2025년 귀속 종합소득세 신고 기한은 2026년 6월 1일까지예요. 신고 대상, 세율 구간, 홈택스 신고 절차, 가산세까지 한번에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/종합소득세-신고-기한-대상",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
