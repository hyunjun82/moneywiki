import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임대차계약 해제와 해지, 뭐가 다른가? 법적 효과와 사용 시점",
  description: "임대차계약 해제와 해지, 뭐가 다른가? 법적 효과와 사용 시점에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대차계약-해제-해지-차이" },
  openGraph: { title: "임대차계약 해제와 해지, 뭐가 다른가? 법적 효과와 사용 시점", description: "임대차계약 해제와 해지, 뭐가 다른가? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/임대차계약-해제-해지-차이", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
