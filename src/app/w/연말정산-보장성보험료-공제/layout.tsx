import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 보장성보험료 공제 — 12% 세액공제 한도와 대상 | 머니위키",
  description: "보장성보험료는 연 100만원 한도로 12% 세액공제를 받아요. 최대 12만원 환급. 생명보험, 자동차보험, 실손보험이 대상이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-보장성보험료-공제" },
  openGraph: {
    title: "연말정산 보장성보험료 공제 — 12% 세액공제 한도와 대상 | 머니위키",
    description: "보장성보험료는 연 100만원 한도로 12% 세액공제를 받아요. 최대 12만원 환급. 생명보험, 자동차보험, 실손보험이 대상이에요.",
    url: "https://www.jjyu.co.kr/w/연말정산-보장성보험료-공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
