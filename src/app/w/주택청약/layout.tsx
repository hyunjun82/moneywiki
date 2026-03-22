import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택청약 가점제 당첨 전략과 청약통장 | 머니위키",
  description: "주택청약 개념부터 청약통장 종류, 가점제와 추첨제, 당첨 전략까지 내 집 마련의 첫걸음이에요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택청약" },
  openGraph: { title: "주택청약 가점제 당첨 전략과 청약통장", description: "주택청약 개념부터 청약통장 종류, 가점제와 추첨제, 당첨 전략까지 내 집 마련의 첫걸음이에요", url: "https://www.jjyu.co.kr/w/주택청약", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
