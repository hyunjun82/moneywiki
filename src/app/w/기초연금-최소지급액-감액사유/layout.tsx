import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 34만원 다 못 받는 경우? 최소 지급액과 감액 사유",
  description: "기초연금이 감액되는 3가지 사유와 최소 보장 금액을 정리했어요. 감액돼도 174,680원은 보장돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-최소지급액-감액사유" },
  openGraph: {
    title: "기초연금 34만원 다 못 받는 경우? 최소 지급액과 감액 사유 | 머니위키",
    description: "기초연금이 감액되는 3가지 사유와 최소 보장 금액을 정리했어요. 감액돼도 174,680원은 보장돼요.",
    url: "https://www.jjyu.co.kr/w/기초연금-최소지급액-감액사유",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
