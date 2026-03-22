import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "출산휴가 및 배우자출산휴가 급여 신청 방법 | 머니위키",
  description: "출산휴가는 단태아 90일, 다태아 120일 보장받아요. 급여는 고용보험에서 월 최대 220만원까지 지급돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/출산휴가" },
  openGraph: {
    title: "출산휴가 및 배우자출산휴가 급여 신청 방법",
    description: "출산휴가는 단태아 90일, 다태아 120일 보장받아요. 급여는 고용보험에서 월 최대 220만원까지 지급돼요.",
    url: "https://www.jjyu.co.kr/w/출산휴가",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
