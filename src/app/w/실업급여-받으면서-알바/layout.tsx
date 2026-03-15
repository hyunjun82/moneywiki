import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 중 알바하면 끊길까? 60시간 기준과 신고 방법 | 머니위키",
  description: "실업급여 받으면서 알바는 월 60시간 미만, 계약기간 3개월 미만이면 가능해요. 알바한 날은 지급이 뒤로 밀리고, 반드시 실업인정일에 신고해야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-받으면서-알바" },
  openGraph: {
    title: "실업급여 중 알바하면 끊길까? 60시간 기준과 신고 방법 | 머니위키",
    description: "실업급여 받으면서 알바는 월 60시간 미만, 계약기간 3개월 미만이면 가능해요. 알바한 날은 지급이 뒤로 밀리고, 반드시 실업인정일에 신고해야 해요.",
    url: "https://www.jjyu.co.kr/w/실업급여-받으면서-알바",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
