import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "학력을 속이면 해고당해도 되나? 경력 사칭 해고의 정당성 기준 | 머니위키",
  description: "학력을 속이면 해고당해도 되나? 경력 사칭 해고의 정당성 기준에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/학력-거짓-이유-해고-정당성" },
  openGraph: { title: "학력을 속이면 해고당해도 되나? 경력 사칭 해고의 정당성 기준", description: "학력을 속이면 해고당해도 되나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/학력-거짓-이유-해고-정당성", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
