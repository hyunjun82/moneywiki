import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교육비 세액공제 대상과 한도, 계산법 | 머니위키",
  description: "교육비 세액공제 대상별 한도, 공제율 15%, 공제 가능·불가 항목, 연말정산 신청 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/교육비공제" },
  openGraph: {
    title: "교육비 세액공제 대상과 한도, 계산법 | 머니위키",
    description: "교육비 세액공제 대상별 한도, 공제율 15%, 공제 가능·불가 항목, 연말정산 신청 방법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/교육비공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
