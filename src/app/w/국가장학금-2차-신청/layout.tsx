import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국가장학금 2차 신청 기간과 금액",
  description: "2026년 1학기 국가장학금 2차 신청은 2월 3일~3월 17일. 소득 1~3구간 학기별 최대 300만원, 기초·차상위 등록금 전액 지원.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국가장학금-2차-신청" },
  openGraph: {
    title: "국가장학금 2차 신청 기간과 금액",
    description: "2026년 1학기 2차 신청 2/3~3/17. 구간별 지원금과 신청 절차 정리.",
    url: "https://www.jjyu.co.kr/w/국가장학금-2차-신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
