import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연금계좌 추가납입하면 공제 더 받나? 세액공제 한도와 전략 | 머니위키",
  description: "연금계좌 추가납입하면 공제 더 받나? 세액공제 한도와 전략에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-연금계좌-추가납입" },
  openGraph: { title: "연금계좌 추가납입하면 공제 더 받나? 세액공제 한도와 전략", description: "연금계좌 추가납입하면 공제 더 받나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-연금계좌-추가납입", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
