import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "2026년 육아휴직급여, 뭐가 바뀌었을까? 급여 계산·6+6 제도·신청방법 | 머니위키",
  description: "2026년 육아휴직 기간 1년 6개월 확대, 일반급여 상한 160만원, 6+6 부모육아휴직제 상한 450만원. 급여 계산기와 신청 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2026년-육아휴직급여" },
  openGraph: {
    title: "2026년 육아휴직급여, 뭐가 바뀌었을까? 급여 계산·6+6 제도·신청방법 | 머니위키",
    description: "2026년 육아휴직 기간 1년 6개월 확대, 일반급여 상한 160만원, 6+6 부모육아휴직제 상한 450만원. 급여 계산기와 신청 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/2026년-육아휴직급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
