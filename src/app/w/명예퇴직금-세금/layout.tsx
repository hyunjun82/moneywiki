import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "명예퇴직금 세금, 일반 퇴직금과 다른가요? | 머니위키",
  description: "명예퇴직금에도 퇴직소득세가 붙지만, 법정 퇴직금 초과분은 근로소득세로 과세될 수 있어요. 세금 계산법과 절세 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/명예퇴직금-세금" },
  openGraph: {
    title: "명예퇴직금 세금, 일반 퇴직금과 다른가요? | 머니위키",
    description: "명예퇴직금에도 퇴직소득세가 붙지만, 법정 퇴직금 초과분은 근로소득세로 과세될 수 있어요. 세금 계산법과 절세 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/명예퇴직금-세금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
