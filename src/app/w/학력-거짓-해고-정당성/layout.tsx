import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "학력 위조 해고 정당성 판단 기준 | 업무 관련성 판례 기준 | 머니위키",
  description: "이력서 학력을 거짓으로 썼다고 무조건 해고가 되는 건 아니에요. 해고 정당성은 업무 관련성과 판례 기준으로 판단해요. 관련 내용을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/학력-거짓-해고-정당성" },
  openGraph: { title: "학력 위조 해고 정당성 판단 기준 | 업무 관련성 판례 기준", description: "이력서 학력을 거짓으로 썼다고 무조건 해고가 되는 건 아니에요. 해고 정당성은 업무 관련성과 판례 기준으로 판단해요. 관련 내용을 알려드려요.", url: "https://www.jjyu.co.kr/w/학력-거짓-해고-정당성", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
