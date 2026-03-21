import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "생활기록부 주민등록등본 인터넷 발급 방법 | 머니위키",
  description: "정부24에서 생활기록부와 주민등록등본을 무료로 발급받는 방법, 출력 방법, 대리 발급 기준을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/정부24-생활기록부-발급-및-주민등록등본-인터넷-발급" },
  openGraph: {
    title: "생활기록부 주민등록등본 인터넷 발급 방법 | 머니위키",
    description: "정부24에서 생활기록부와 주민등록등본을 무료로 발급받는 방법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/정부24-생활기록부-발급-및-주민등록등본-인터넷-발급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
