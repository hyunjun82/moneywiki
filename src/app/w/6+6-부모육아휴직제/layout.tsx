import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아휴직 급여 6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산",
  description: "육아휴직 급여 6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/6+6-부모육아휴직제",
  },
  openGraph: {
    title: "육아휴직 급여 6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산",
    description: "육아휴직 급여 6+6 부모육아휴직제 | 신청 조건과 월별 금액 계산 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/6+6-부모육아휴직제",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
