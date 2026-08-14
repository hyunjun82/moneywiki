import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "사전청약과 본청약, 뭐가 다른가? 사전당첨자의 권리와 의무",
  description: "사전청약과 본청약, 뭐가 다른가? 사전당첨자의 권리와 의무에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/사전청약-입주예정자-사전당첨자-차이" },
  openGraph: { title: "사전청약과 본청약, 뭐가 다른가? 사전당첨자의 권리와 의무", description: "사전청약과 본청약, 뭐가 다른가? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/사전청약-입주예정자-사전당첨자-차이", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
