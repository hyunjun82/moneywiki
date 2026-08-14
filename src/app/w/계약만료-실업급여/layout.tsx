import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약만료 실업급여, 갱신 거부당하면? 수급 조건과 계산법",
  description: "계약기간 만료로 퇴직하면 비자발적 퇴사로 실업급여를 받을 수 있죠. 갱신 거부 시 주의할 점과 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약만료-실업급여" },
  openGraph: {
    title: "계약만료 실업급여, 갱신 거부당하면? 수급 조건과 계산법 | 머니위키",
    description: "계약기간 만료로 퇴직하면 비자발적 퇴사로 실업급여를 받을 수 있죠. 갱신 거부 시 주의할 점과 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약만료-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
