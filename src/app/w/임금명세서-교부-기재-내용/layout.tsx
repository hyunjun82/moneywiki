export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임금명세서에 뭐가 적혀야 하나? 필수 기재 항목과 교부 의무 | 머니위키",
  description: "임금명세서에 뭐가 적혀야 하나? 필수 기재 항목과 교부 의무에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금명세서-교부-기재-내용" },
  openGraph: { title: "임금명세서에 뭐가 적혀야 하나? 필수 기재 항목과 교부 의무", description: "임금명세서에 뭐가 적혀야 하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/임금명세서-교부-기재-내용", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
