import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "가압류 신청, 법정에 가야 하나? 신청 절차와 필요 여부 | 머니위키",
  description: "가압류 신청, 법정에 가야 하나? 신청 절차와 필요 여부에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가압류-신청-법정-출두-필요" },
  openGraph: { title: "가압류 신청, 법정에 가야 하나? 신청 절차와 필요 여부", description: "가압류 신청, 법정에 가야 하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/가압류-신청-법정-출두-필요", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
