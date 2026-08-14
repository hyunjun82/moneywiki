import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경매로 집 넘어갔는데, 임대차계약은 어떻게 되나요?",
  description: "대항력 있으면 매수인이 임대차 승계. 없으면 경매로 소멸. 소액임차인 최우선변제와 해지권 행사 방법 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경매-임대차계약-해지권" },
  openGraph: { title: "경매 시 임대차계약 해지권", description: "대항력 유무에 따라 보증금 보호 범위가 달라져요.", url: "https://www.jjyu.co.kr/w/경매-임대차계약-해지권", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
