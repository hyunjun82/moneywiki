import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농지 폐수배출시설 전용허가 제한 시설 | 머니위키",
  description: "농지를 폐수배출시설로 쓰려고 전용허가 신청했는데 거부될 수 있어요. 도시지역이나 계획관리지역이 아니면 안 되거든요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-폐수배출시설-전용허가-제한" },
  openGraph: { title: "농지 폐수배출시설 전용허가 제한 시설", description: "농지를 폐수배출시설로 쓰려고 전용허가 신청했는데 거부될 수 있어요. 도시지역이나 계획관리지역이 아니면 안 되거든요.", url: "https://www.jjyu.co.kr/w/농지-폐수배출시설-전용허가-제한", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
