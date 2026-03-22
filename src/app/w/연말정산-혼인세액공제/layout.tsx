import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "결혼하면 세금 100만원 깎아줘요 혼인세액공제 조건과 신청 방법 | 머니위키",
  description: "2024~2026년 혼인신고하면 부부 각각 50만원씩 세액공제돼요. 생애 1회, 초혼·재혼 무관. 혼인관계증명서 제출로 신청해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-혼인세액공제",
  },
  openGraph: {
    title: "결혼하면 세금 100만원 깎아줘요 혼인세액공제 조건과 신청 방법",
    description: "부부 각각 50만원, 합계 100만원 세액공제. 2024~2026년 한정.",
    url: "https://www.jjyu.co.kr/w/연말정산-혼인세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
