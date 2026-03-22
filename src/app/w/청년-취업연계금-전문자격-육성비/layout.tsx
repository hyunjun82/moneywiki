import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년 취업연계금·전문자격 육성비 | 머니위키",
  description: "청년이 취업하면 정부에서 월 50만 원씩 최대 6개월간 취업연계금을 지원해요. 자격증 시험비도 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년-취업연계금-전문자격-육성비" },
  openGraph: { title: "청년 취업연계금·전문자격 육성비", description: "청년이 취업하면 정부에서 월 50만 원씩 최대 6개월간 취업연계금을 지원해요. 자격증 시험비도 받을 수 있어요.", url: "https://www.jjyu.co.kr/w/청년-취업연계금-전문자격-육성비", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
