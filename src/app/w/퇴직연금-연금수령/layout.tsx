import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 연금수령, 세금 30~50% 감면 조건과 신청 방법",
  description: "55세 이후 10년 이상 나눠 받으면 퇴직소득세 30~50% 감면. 2026년 21년 차 이후 50% 감면 신설. 연금소득세율·수령 방식·신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-연금수령" },
  openGraph: {
    title: "퇴직연금 연금수령, 세금 30~50% 감면 조건과 신청 방법 | 머니위키",
    description: "55세 이후 10년 이상 나눠 받으면 퇴직소득세 30~50% 감면. 2026년 21년 차 이후 50% 감면 신설. 연금소득세율·수령 방식·신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-연금수령",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
