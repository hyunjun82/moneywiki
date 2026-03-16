import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "피보험기간 180일, 어떻게 채울까? 직장 합산과 계산 방법 | 머니위키",
  description: "피보험기간은 고용보험에 가입해 일한 기간이에요. 180일 이상이어야 실업급여를 받을 수 있고, 여러 직장 기간을 합산할 수 있죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-피보험기간" },
  openGraph: {
    title: "피보험기간 180일, 어떻게 채울까? 직장 합산과 계산 방법 | 머니위키",
    description: "피보험기간은 고용보험에 가입해 일한 기간이에요. 180일 이상이어야 실업급여를 받을 수 있고, 여러 직장 기간을 합산할 수 있죠.",
    url: "https://www.jjyu.co.kr/w/실업급여-피보험기간",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
