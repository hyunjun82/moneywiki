import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 취업",
  description: "중소기업 청년 취업자는 소득세 90% 감면받아요. 5년간 최대 150만원씩 연 750만원 세금 줄일 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-취업" },
  openGraph: { title: "연말정산 취업", description: "중소기업 청년 취업자는 소득세 90% 감면받아요. 5년간 최대 150만원씩 연 750만원 세금 줄일 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-취업", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
