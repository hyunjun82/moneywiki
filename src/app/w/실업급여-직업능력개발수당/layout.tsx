import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "훈련받으면 수당 따로 나온다고? 직업능력개발수당 금액과 신청 방법 | 머니위키",
  description: "실업급여 받으면서 직업훈련 받으면 교통비·식비 명목으로 월 최대 11만6천원을 추가로 받을 수 있어요. 조건과 지급 방식을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-직업능력개발수당" },
  openGraph: {
    title: "훈련받으면 수당 따로 나온다고? 직업능력개발수당 금액과 신청 방법 | 머니위키",
    description: "실업급여 받으면서 직업훈련 받으면 교통비·식비 명목으로 월 최대 11만6천원을 추가로 받을 수 있어요. 조건과 지급 방식을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-직업능력개발수당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
