import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자녀장려금과 근로장려금, 어떻게 신청하나요? 신청 조건과 지급 금액 | 머니위키",
  description: "5월에 홈택스로 신청. 근로장려금 최대 330만원, 자녀장려금 최대 100만원이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자녀장려금-근로장려금-신청" },
  openGraph: { title: "자녀장려금과 근로장려금, 어떻게 신청하나요? 신청 조건과 지급 금액 | 머니위키", description: "5월에 홈택스로 신청. 근로장려금 최대 330만원, 자녀장려금 최대 100만원이에요.", url: "https://www.jjyu.co.kr/w/자녀장려금-근로장려금-신청", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
