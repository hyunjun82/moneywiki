import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금 늦게 신청하면 밀린 돈 받을까? 소급 지급 여부와 손해",
  description: "기초연금은 소급 지급이 안 돼요. 신청한 달부터 받기 때문에 늦게 신청하면 그만큼 못 받는 돈이 생기죠. 얼마나 손해인지 계산해봤어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-소급지급-여부-손해" },
  openGraph: { title: "기초연금 늦게 신청하면 밀린 돈 받을까? 소급 지급 여부와 손해 | 머니위키", description: "기초연금은 소급 지급이 안 돼요. 신청한 달부터 받기 때문에 늦게 신청하면 그만큼 못 받는 돈이 생기죠. 얼마나 손해인지 계산해봤어요.", url: "https://www.jjyu.co.kr/w/기초연금-소급지급-여부-손해", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
