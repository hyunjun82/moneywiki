import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "중개형 IRP, 일반 IRP와 뭐가 다른가? 수수료와 투자 상품 비교 | 머니위키",
  description: "중개형 IRP, 일반 IRP와 뭐가 다른가? 수수료와 투자 상품 비교에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/중개형-IRP-장점-수수료-투자-상품" },
  openGraph: { title: "중개형 IRP, 일반 IRP와 뭐가 다른가? 수수료와 투자 상품 비교", description: "중개형 IRP, 일반 IRP와 뭐가 다른가? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/중개형-IRP-장점-수수료-투자-상품", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
