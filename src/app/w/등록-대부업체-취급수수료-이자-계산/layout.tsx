import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "등록 대부업체 취급수수료 이자 계산",
  description: "대출 시 수수료를 빼고 받으면 실제 이자가 얼마인지 계산하는 방법을 알려드려요",
  openGraph: { title: "등록 대부업체 취급수수료 이자 계산", description: "대출 시 수수료를 빼고 받으면 실제 이자가 얼마인지 계산하는 방법을 알려드려요", url: "https://jjyu.co.kr/w/등록-대부업체-취급수수료-이자-계산" },
  alternates: { canonical: "https://jjyu.co.kr/w/등록-대부업체-취급수수료-이자-계산" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
