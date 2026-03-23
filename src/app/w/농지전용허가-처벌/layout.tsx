import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농지전용허가 안 받고 전용하면 처벌 | 머니위키",
  description: "농지를 허가 없이 주차장이나 건물로 만들면 5년 이하 징역이나 벌금이에요. 원상회복 명령도 받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지전용허가-처벌" },
  openGraph: {
    title: "농지전용허가 안 받고 전용하면 처벌",
    description: "농지를 허가 없이 주차장이나 건물로 만들면 5년 이하 징역이나 벌금이에요. 원상회복 명령도 받아요.",
    url: "https://www.jjyu.co.kr/w/농지전용허가-처벌",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
