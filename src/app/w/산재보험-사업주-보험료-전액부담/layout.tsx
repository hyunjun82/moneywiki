import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "산재보험 사업주 보험료 전액부담·근로자 부담 없음·징수 기준 | 머니위키",
  description: "산재보험료는 사업주가 100% 전액 부담해요. 근로자 급여에서 공제하면 불법이고 처벌 대상이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산재보험-사업주-보험료-전액부담" },
  openGraph: {
    title: "산재보험 사업주 보험료 전액부담·근로자 부담 없음·징수 기준",
    description: "산재보험료는 사업주가 100% 전액 부담해요. 근로자 급여에서 공제하면 불법이고 처벌 대상이에요.",
    url: "https://www.jjyu.co.kr/w/산재보험-사업주-보험료-전액부담",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
