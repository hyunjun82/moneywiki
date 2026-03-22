import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "이혼 사유 별거 2년: 별거 기준 및 신청 조건 | 머니위키",
  description: "별거만으로 이혼이 가능한지 알려드려요. 민법에서 정한 재판상 이혼 사유와 별거 기간, 혼인 파탄 입증 방법을 쉽게 설명해요",
  openGraph: { title: "이혼 사유 별거 2년: 별거 기준 및 신청 조건", description: "별거만으로 이혼이 가능한지 알려드려요. 민법에서 정한 재판상 이혼 사유와 별거 기간, 혼인 파탄 입증 방법을 쉽게 설명해요", url: "https://jjyu.co.kr/w/이혼-사유-별거-2년" },
  alternates: { canonical: "https://jjyu.co.kr/w/이혼-사유-별거-2년" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
