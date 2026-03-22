import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "투표사무원 일당 얼마일까? 업무 내용과 신청 자격 | 머니위키",
  description: "투표사무원 일당은 13만원이에요. 투표일 당일 약 14시간 근무하면서 신분 확인과 투표용지 교부를 담당하죠. 신청 자격과 업무 내용을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/투표사무원-급여-업무-신청자격" },
  openGraph: {
    title: "투표사무원 일당 얼마일까? 업무 내용과 신청 자격 | 머니위키",
    description: "투표사무원 일당은 13만원이에요. 투표일 당일 약 14시간 근무하면서 신분 확인과 투표용지 교부를 담당하죠.",
    url: "https://www.jjyu.co.kr/w/투표사무원-급여-업무-신청자격",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
