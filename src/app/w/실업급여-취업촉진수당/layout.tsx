import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "취업촉진수당 4종류, 뭐가 다를까? 종류별 조건과 금액 비교",
  description: "실업급여 수급자가 추가로 받을 수 있는 취업촉진수당 4가지를 정리했어요. 조기재취업수당, 직업능력개발수당, 광역구직활동비, 이주비의 조건과 신청 방법을 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-취업촉진수당" },
  openGraph: {
    title: "취업촉진수당 4종류, 뭐가 다를까? 종류별 조건과 금액 비교 | 머니위키",
    description: "실업급여 수급자가 추가로 받을 수 있는 취업촉진수당 4가지를 정리했어요. 조기재취업수당, 직업능력개발수당, 광역구직활동비, 이주비의 조건과 신청 방법을 안내해요.",
    url: "https://www.jjyu.co.kr/w/실업급여-취업촉진수당",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
