import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임금 상품권 지급 가능: 임금 법적 기준 및 임금 유효성 | 머니위키",
  description: "회사에서 월급을 상품권으로 줘도 되는지 알려드려요. 원칙적으로 현금 지급이 원칙이지만 복리후생 목적이면 가능해요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금-상품권-지급-가능" },
  openGraph: { title: "임금 상품권 지급 가능: 임금 법적 기준 및 임금 유효성", description: "회사에서 월급을 상품권으로 줘도 되는지 알려드려요. 원칙적으로 현금 지급이 원칙이지만 복리후생 목적이면 가능해요", url: "https://www.jjyu.co.kr/w/임금-상품권-지급-가능", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
