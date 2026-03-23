import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로자 실수 사고 산재 보상 — 과실이어도 산재 되나? | 머니위키",
  description: "본인 실수로 다쳐도 업무 중 사고면 산재로 인정돼요. 고의·범죄만 제외. 산재 인정 기준과 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로자-실수-사고-산재-보상" },
  openGraph: { title: "근로자 실수 사고 산재 보상", description: "과실이어도 산재 인정. 기준과 신청 절차.", url: "https://www.jjyu.co.kr/w/근로자-실수-사고-산재-보상", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
