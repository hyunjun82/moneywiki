import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직급여 지급 대상 조건 | 머니위키",
  description: "퇴직급여를 받으려면 1년 이상 근무해야 해요. 정확한 지급 조건 설명해 드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직급여-지급-대상-조건" },
  openGraph: {
    title: "퇴직급여 지급 대상 조건",
    description: "퇴직급여를 받으려면 1년 이상 근무해야 해요. 정확한 지급 조건 설명해 드려요.",
    url: "https://www.jjyu.co.kr/w/퇴직급여-지급-대상-조건",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
