import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전통시장 결제하면 공제율이 높나? 40% 공제율과 추가 한도",
  description: "전통시장 결제하면 공제율이 높나? 40% 공제율과 추가 한도에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-전통시장-공제" },
  openGraph: { title: "전통시장 결제하면 공제율이 높나? 40% 공제율과 추가 한도", description: "전통시장 결제하면 공제율이 높나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-전통시장-공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
