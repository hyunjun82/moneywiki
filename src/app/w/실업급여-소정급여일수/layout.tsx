import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 소정급여일수, 나이·가입기간별 며칠 받나? 기준표",
  description: "실업급여 며칠 받을 수 있는지 궁금하죠. 나이와 고용보험 가입기간으로 120일~270일이 정해져요. 2026년 기준표와 최대 수령액을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-소정급여일수" },
  openGraph: {
    title: "실업급여 소정급여일수, 나이·가입기간별 며칠 받나? 기준표 | 머니위키",
    description: "실업급여 며칠 받을 수 있는지 궁금하죠. 나이와 고용보험 가입기간으로 120일~270일이 정해져요. 2026년 기준표와 최대 수령액을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-소정급여일수",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
