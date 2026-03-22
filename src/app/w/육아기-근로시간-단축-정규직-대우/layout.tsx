import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "육아기 근로시간 단축, 정규직 대우 받나? 단축 조건과 급여 기준 | 머니위키",
  description: "육아기 근로시간 단축, 정규직 대우 받나? 단축 조건과 급여 기준에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아기-근로시간-단축-정규직-대우" },
  openGraph: { title: "육아기 근로시간 단축, 정규직 대우 받나? 단축 조건과 급여 기준", description: "육아기 근로시간 단축, 정규직 대우 받나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/육아기-근로시간-단축-정규직-대우", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
