import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산휴가 중 계약만료, 실업급여? 수급 자격과 신청 절차",
  description: "산전후휴가 중 계약만료되면 비자발적 퇴사로 실업급여를 받을 수 있어요. 출산휴가급여와 실업급여 수급 순서, 수급기간 연장까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/산전후휴가-계약만료-실업급여" },
  openGraph: {
    title: "출산휴가 중 계약만료, 실업급여? 수급 자격과 신청 절차 | 머니위키",
    description: "산전후휴가 중 계약만료되면 비자발적 퇴사로 실업급여를 받을 수 있어요. 출산휴가급여와 실업급여 수급 순서, 수급기간 연장까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/산전후휴가-계약만료-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
