import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "간이대지급금 지급액 상한 기준 | 임금 퇴직금 합산 한도 계산",
  description: "간이대지급금은 임금과 퇴직금을 합쳐서 최대 얼마까지 받을 수 있는지 알고 계셨나요? 합산 한도 기준과 항목별 계산 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/간이대지급금-지급액-상한액" },
  openGraph: { title: "간이대지급금 지급액 상한 기준 | 임금 퇴직금 합산 한도 계산", description: "간이대지급금은 임금과 퇴직금을 합쳐서 최대 얼마까지 받을 수 있는지 알고 계셨나요? 합산 한도 기준과 항목별 계산 방법을 알려드려요.", url: "https://www.jjyu.co.kr/w/간이대지급금-지급액-상한액", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
