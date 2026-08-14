import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "구직촉진수당, 월 60만원 받을 수 있을까? 자격 조건과 신청 방법",
  description: "국민취업지원제도 1유형에 해당하면 구직촉진수당 월 60만원, 최대 6개월 360만원을 받아요. 1유형·2유형 차이, 청년 특례, 신청 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직촉진수당" },
  openGraph: {
    title: "구직촉진수당, 월 60만원 받을 수 있을까? 자격 조건과 신청 방법 | 머니위키",
    description: "국민취업지원제도 1유형에 해당하면 구직촉진수당 월 60만원, 최대 6개월 360만원을 받아요. 1유형·2유형 차이, 청년 특례, 신청 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/구직촉진수당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
