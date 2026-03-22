import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "중도퇴사 후 연말정산 어떻게 하나? 퇴사 시기별 처리 방법 | 머니위키",
  description: "중도퇴사 후 연말정산 어떻게 하나? 퇴사 시기별 처리 방법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/중도퇴사자-연말정산-처리" },
  openGraph: { title: "중도퇴사 후 연말정산 어떻게 하나? 퇴사 시기별 처리 방법", description: "중도퇴사 후 연말정산 어떻게 하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/중도퇴사자-연말정산-처리", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
