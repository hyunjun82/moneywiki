import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "직원 100명이면 장애인 몇 명? 의무고용 비율 3.1%와 부담금 계산",
  description: "100명 기업은 장애인 3명 이상 고용해야 해요. 미달 시 연 수천만원 부담금, 고용 시 월 최대 120만원 장려금을 받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-의무고용-100명-기준-비율" },
  openGraph: {
    title: "직원 100명이면 장애인 몇 명? 의무고용 비율 3.1%와 부담금 계산 | 머니위키",
    description: "100명 기업은 장애인 3명 이상 고용해야 해요. 미달 시 연 수천만원 부담금, 고용 시 월 최대 120만원 장려금을 받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/장애인-의무고용-100명-기준-비율",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
