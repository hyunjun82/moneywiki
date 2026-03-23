import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미혼청년 공공분양 특별공급, 자격 조건과 신청 방법 | 머니위키",
  description: "19~39세 무주택 미혼이면 신청 가능해요. 소득 140% 이하, 자산 2.88억 이하, 청약통장 6개월 조건과 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/미혼청년-공공분양-특별공급-자격" },
  openGraph: {
    title: "미혼청년 공공분양 특별공급, 자격 조건과 신청 방법 | 머니위키",
    description: "19~39세 무주택 미혼이면 신청 가능해요. 소득 140% 이하, 자산 2.88억 이하, 청약통장 6개월 조건과 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/미혼청년-공공분양-특별공급-자격",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
