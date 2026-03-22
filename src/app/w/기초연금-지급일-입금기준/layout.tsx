import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금, 매달 며칠에 들어올까? 지급일과 입금 기준 | 머니위키",
  description: "기초연금은 매월 25일에 입금돼요. 주말이나 공휴일이면 앞당겨지고, 첫 지급은 신청 시기에 따라 달라져요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-지급일-입금기준" },
  openGraph: { title: "기초연금, 매달 며칠에 들어올까? 지급일과 입금 기준 | 머니위키", description: "기초연금은 매월 25일에 입금돼요. 주말이나 공휴일이면 앞당겨지고, 첫 지급은 신청 시기에 따라 달라져요.", url: "https://www.jjyu.co.kr/w/기초연금-지급일-입금기준", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
