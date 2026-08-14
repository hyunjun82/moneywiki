import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "가사근로자 근로시간 기준: 근로시간 및 초과근무 규정",
  description: "가사근로자의 최소 근로시간은 주당 15시간 이상이에요. 법정 근로시간과 초과근무 기준, 가산수당까지 자세히 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가사근로자-근로시간-기준" },
  openGraph: {
    title: "가사근로자 근로시간 기준: 근로시간 및 초과근무 규정",
    description: "가사근로자의 최소 근로시간은 주당 15시간 이상이에요. 법정 근로시간과 초과근무 기준, 가산수당까지 자세히 알려드려요",
    url: "https://www.jjyu.co.kr/w/가사근로자-근로시간-기준",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
