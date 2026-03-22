import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기부금공제, 얼마나 돌려받을까? 공제율·한도·이월까지 | 머니위키",
  description: "기부금 1천만원 이하 15%, 초과분 30%, 3천만원 넘으면 40% 세액공제. 법정·지정·종교 한도 차이와 10년 이월공제까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기부금공제" },
  openGraph: {
    title: "기부금공제, 얼마나 돌려받을까? 공제율·한도·이월까지 | 머니위키",
    description: "기부금 1천만원 이하 15%, 초과분 30%, 3천만원 넘으면 40% 세액공제. 법정·지정·종교 한도 차이와 10년 이월공제까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기부금공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
