import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "한부모도 추가 공제 받을 수 있나? 한부모 소득공제 100만원",
  description: "한부모도 추가 공제 받을 수 있나? 한부모 소득공제 100만원에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-한부모-공제" },
  openGraph: { title: "한부모도 추가 공제 받을 수 있나? 한부모 소득공제 100만원", description: "한부모도 추가 공제 받을 수 있나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/연말정산-한부모-공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
