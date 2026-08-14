import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "승강기 사고 나면 어디에 보고하나? 보고 의무와 절차",
  description: "승강기 사고 나면 어디에 보고하나? 보고 의무와 절차에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/승강기-사고-보고-의무" },
  openGraph: { title: "승강기 사고 나면 어디에 보고하나? 보고 의무와 절차", description: "승강기 사고 나면 어디에 보고하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/승강기-사고-보고-의무", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
