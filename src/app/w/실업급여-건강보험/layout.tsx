import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 수급 중 건강보험 처리 방법과 보험료 줄이는 법",
  description: "퇴사 후 실업급여를 받으면 지역가입자로 전환돼요. 임의계속가입이나 피부양자 등록으로 건강보험료 부담을 줄이는 방법을 정리했어요.",
  openGraph: {
    title: "실업급여 수급 중 건강보험 처리 방법과 보험료 줄이는 법 | 머니위키",
    description: "실업급여 받을 때 건강보험료를 줄이는 방법이에요.",
    url: "https://www.jjyu.co.kr/w/실업급여-건강보험",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-건강보험" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
