import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보증 종류 일반보증 연대보증 근보증 차이 | 머니위키",
  description: "일반보증, 연대보증, 근보증의 차이와 최고검색의 항변권에 대해 쉽게 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보증-종류-차이" },
  openGraph: { title: "보증 종류 일반보증 연대보증 근보증 차이", description: "일반보증, 연대보증, 근보증의 차이와 최고검색의 항변권에 대해 쉽게 알려드려요", url: "https://www.jjyu.co.kr/w/보증-종류-차이", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
