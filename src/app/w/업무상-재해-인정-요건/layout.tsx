import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "업무상 재해 인정 요건·신청·산재보험 보상 범위 | 머니위키",
  description: "업무 중 다쳐도 산재 인정 안 될 수 있어요. 업무상 재해 인정 3가지 요건과 신청 방법, 산재보험 보상 범위 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/업무상-재해-인정-요건" },
  openGraph: {
    title: "업무상 재해 인정 요건·신청·산재보험 보상 범위",
    description: "업무 중 다쳐도 산재 인정 안 될 수 있어요. 업무상 재해 인정 3가지 요건과 신청 방법, 산재보험 보상 범위 알려드려요.",
    url: "https://www.jjyu.co.kr/w/업무상-재해-인정-요건",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
