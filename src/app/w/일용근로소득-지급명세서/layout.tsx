import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "일용근로소득 지급명세서 제출 방법 제출 기한과 작성법 | 머니위키",
  description: "일용근로소득 지급명세서 제출 방법 제출 기한과 작성법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/일용근로소득-지급명세서" },
  openGraph: { title: "일용근로소득 지급명세서 제출 방법 제출 기한과 작성법", description: "일용근로소득 지급명세서 제출 방법 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/일용근로소득-지급명세서", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
