import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "종신보험 사망보험금 상속세 과세 기준과 절세 방법 | 머니위키",
  description: "종신보험 사망보험금의 상속세 과세 여부, 계약자·수익자 관계별 세금 차이, 절세 방법과 신고 절차를 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/종신보험-사망보험금-상속세" },
  openGraph: {
    title: "종신보험 사망보험금 상속세 과세 기준과 절세 방법 | 머니위키",
    description: "종신보험 사망보험금의 상속세 과세 여부, 계약자·수익자 관계별 세금 차이, 절세 방법과 신고 절차를 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/종신보험-사망보험금-상속세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
