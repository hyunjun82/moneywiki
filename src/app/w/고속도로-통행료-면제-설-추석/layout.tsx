import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "설·추석 고속도로 통행료 면제 — 면제 시간과 대상 도로 | 머니위키",
  description: "설·추석 연휴에 한국도로공사 고속도로 통행료가 면제돼요. 면제 시간, 대상 도로, 민자도로 제외 여부를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/고속도로-통행료-면제-설-추석" },
  openGraph: { title: "설·추석 고속도로 통행료 면제 — 면제 시간과 대상 도로", description: "설·추석 연휴에 한국도로공사 고속도로 통행료가 면제돼요. 면제 시간, 대상 도로, 민자도로 제외 여부를 정리했어요.", url: "https://www.jjyu.co.kr/w/고속도로-통행료-면제-설-추석", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
