import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "일용직 실업급여, 며칠 일해야 받을까? 자격과 금액 | 머니위키",
  description: "일용직도 고용보험 가입되어 있으면 실업급여를 받을 수 있어요. 조건, 금액, 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/일용직-실업급여" },
  openGraph: {
    title: "일용직 실업급여, 며칠 일해야 받을까? 자격과 금액 | 머니위키",
    description: "일용직도 고용보험 가입되어 있으면 실업급여를 받을 수 있어요. 조건, 금액, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/일용직-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
