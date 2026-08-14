import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연금 받으면서 일하면 연말정산이 어떻게 되나요? 연금소득과 근로소득 합산",
  description: "연금소득과 근로소득이 동시에 있으면 5월 종합소득세 신고가 필요할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-연금소득" },
  openGraph: { title: "연금 받으면서 일하면 연말정산이 어떻게 되나요? 연금소득과 근로소득 합산 | 머니위키", description: "연금소득과 근로소득이 동시에 있으면 5월 종합소득세 신고가 필요할 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-연금소득", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
