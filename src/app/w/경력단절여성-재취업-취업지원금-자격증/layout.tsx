import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경력단절여성 재취업 지원금, 얼마나 받을 수 있나? 자격증 비용까지",
  description: "경력단절여성은 여성새로일하기센터에서 교육 참여수당 월 30만원, 인턴 지원금 최대 320만원, 자격증 시험비까지 지원받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경력단절여성-재취업-취업지원금-자격증" },
  openGraph: {
    title: "경력단절여성 재취업 지원금, 얼마나 받을 수 있나? 자격증 비용까지 | 머니위키",
    description: "경력단절여성은 여성새로일하기센터에서 교육 참여수당 월 30만원, 인턴 지원금 최대 320만원, 자격증 시험비까지 지원받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/경력단절여성-재취업-취업지원금-자격증",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
