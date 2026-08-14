import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴사 후 실업급여, 언제까지 신청해야? 12개월 기한과 절차",
  description: "퇴직일 다음 날부터 12개월 이내에 실업급여를 신청해야 해요. 늦게 신청하면 수급일수가 줄고, 12개월 지나면 수급권이 소멸돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴사후-실업급여-신청-기간" },
  openGraph: {
    title: "퇴사 후 실업급여, 언제까지 신청해야? 12개월 기한과 절차 | 머니위키",
    description: "퇴직일 다음 날부터 12개월 이내에 실업급여를 신청해야 해요. 늦게 신청하면 수급일수가 줄고, 12개월 지나면 수급권이 소멸돼요.",
    url: "https://www.jjyu.co.kr/w/퇴사후-실업급여-신청-기간",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
