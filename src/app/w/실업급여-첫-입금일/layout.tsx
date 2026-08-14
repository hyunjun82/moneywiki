import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 첫 입금, 언제 들어올까? 대기기간과 입금 일정",
  description: "실업급여 신청 후 첫 입금까지 보통 2~3주 걸려요. 대기기간 7일과 1차 실업인정 절차, 입금 일정을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-첫-입금일" },
  openGraph: {
    title: "실업급여 첫 입금, 언제 들어올까? 대기기간과 입금 일정 | 머니위키",
    description: "실업급여 신청 후 첫 입금까지 보통 2~3주 걸려요. 대기기간 7일과 1차 실업인정 절차, 입금 일정을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-첫-입금일",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
