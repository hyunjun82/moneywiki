import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 받으면서 추가로 받는 돈? 취업지원금 4가지 종류와 조건",
  description: "조기재취업수당, 직업능력개발수당, 광역구직활동비, 이주비 4가지를 정리했어요. 국민취업지원제도와의 중복 여부도 비교해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-취업지원금" },
  openGraph: {
    title: "실업급여 받으면서 추가로 받는 돈? 취업지원금 4가지 종류와 조건 | 머니위키",
    description: "조기재취업수당, 직업능력개발수당, 광역구직활동비, 이주비 4가지를 정리했어요. 국민취업지원제도와의 중복 여부도 비교해요.",
    url: "https://www.jjyu.co.kr/w/실업급여-취업지원금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
