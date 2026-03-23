import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기간제근로자 정기상여금 동일 | 머니위키",
  description: "기간제로 일해도 정규직과 같은 상여금 받을 수 있을까요? 차별 금지 원칙과 지급 기준을 구체적으로 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기간제근로자-정기상여금-동일" },
  openGraph: {
    title: "기간제근로자 정기상여금 동일",
    description: "기간제로 일해도 정규직과 같은 상여금 받을 수 있을까요? 차별 금지 원칙과 지급 기준을 구체적으로 알려드려요.",
    url: "https://www.jjyu.co.kr/w/기간제근로자-정기상여금-동일",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
