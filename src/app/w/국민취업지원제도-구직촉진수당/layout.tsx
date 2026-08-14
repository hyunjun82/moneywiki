import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민취업지원제도 구직촉진수당, 월 50만원 6개월 조건과 신청 방법",
  description: "국민취업지원제도 1유형 자격 조건(소득·재산·취업경험)과 구직촉진수당 월 50만원 신청 방법을 정리했어요. 실업급여 자격 없어도 신청할 수 있어요.",
  openGraph: {
    title: "국민취업지원제도 구직촉진수당, 월 50만원 6개월 조건과 신청 방법 | 머니위키",
    description: "국민취업지원제도 1유형 자격 조건과 구직촉진수당 신청 방법을 정리했어요. 실업급여 자격 없어도 가능해요.",
    url: "https://www.jjyu.co.kr/w/국민취업지원제도-구직촉진수당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민취업지원제도-구직촉진수당" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
