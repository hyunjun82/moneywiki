import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "간이지급명세서 제출 기한 사업소득 기타소득 매월 말일까지 | 머니위키",
  description: "프리랜서 용역비나 강연료를 지급했으면 간이지급명세서를 매월 말일까지 제출해야 해요. 홈택스에서 전자제출하는 방법 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/간이지급명세서-제출" },
  openGraph: {
    title: "간이지급명세서 제출 기한 사업소득 기타소득 매월 말일까지",
    description: "프리랜서 용역비나 강연료를 지급했으면 간이지급명세서를 매월 말일까지 제출해야 해요. 홈택스에서 전자제출하는 방법 알려드려요.",
    url: "https://www.jjyu.co.kr/w/간이지급명세서-제출",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
