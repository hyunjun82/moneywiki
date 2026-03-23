import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 건강보험료, 얼마나 공제되나요? 한도 없이 전액 소득공제 | 머니위키",
  description: "건강보험료와 장기요양보험료 본인 부담분 전액이 한도 없이 소득공제돼요. 월급 300만원이면 연 144만원 공제, 간소화서비스에서 자동 반영이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-건강보험료",
  },
  openGraph: {
    title: "연말정산 건강보험료, 얼마나 공제되나요? 한도 없이 전액 소득공제",
    description: "본인 부담분 전액 공제, 한도 없음. 자동 반영이라 따로 할 일 없어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-건강보험료",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
