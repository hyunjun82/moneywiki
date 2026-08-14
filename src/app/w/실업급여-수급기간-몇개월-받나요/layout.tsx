import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 몇 개월 받을까? 나이·가입기간별 수급 기간표",
  description: "실업급여 수급기간은 나이와 고용보험 가입기간에 따라 120일~270일이에요. 50세 이상이면 같은 가입기간이어도 30일 더 오래 받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급기간-몇개월-받나요" },
  openGraph: {
    title: "실업급여 몇 개월 받을까? 나이·가입기간별 수급 기간표 | 머니위키",
    description: "실업급여 수급기간은 나이와 고용보험 가입기간에 따라 120일~270일이에요. 50세 이상이면 같은 가입기간이어도 30일 더 오래 받아요.",
    url: "https://www.jjyu.co.kr/w/실업급여-수급기간-몇개월-받나요",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
