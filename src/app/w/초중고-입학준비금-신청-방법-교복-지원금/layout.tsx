import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "초중고 입학준비금 신청 방법과 교복 지원금 | 머니위키",
  description: "초·중·고 입학준비금과 교복 지원금 신청 대상, 지원 금액, 신청 방법과 필요 서류를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/초중고-입학준비금-신청-방법-교복-지원금" },
  openGraph: {
    title: "초중고 입학준비금 신청 방법과 교복 지원금 | 머니위키",
    description: "초·중·고 입학준비금과 교복 지원금 신청 대상, 지원 금액, 신청 방법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/초중고-입학준비금-신청-방법-교복-지원금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
