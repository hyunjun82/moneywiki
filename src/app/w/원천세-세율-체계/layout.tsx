import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "원천세 세율, 어떤 소득에 몇 % 떼나? 소득 유형별 원천세율 정리 | 머니위키",
  description: "근로소득은 간이세액표, 사업소득(프리랜서)은 3.3%, 이자·배당은 15.4%가 기본 원천세율이에요. 소득 유형별 세율과 신고 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/원천세-세율-체계" },
  openGraph: { title: "원천세 세율, 어떤 소득에 몇 % 떼나? 소득 유형별 원천세율 정리", description: "근로소득은 간이세액표, 사업소득(프리랜서)은 3.3%, 이자·배당은 15.4%가 기본 원천세율이에요. 소득 유형별 세율과 신고 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/원천세-세율-체계", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
