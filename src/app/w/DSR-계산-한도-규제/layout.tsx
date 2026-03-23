import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DSR 때문에 대출이 안 된다면? 계산법과 한도 | 머니위키",
  description: "DSR은 연소득 대비 대출 원리금 비율이에요. 은행 40%, 비은행 50% 한도에 2026년 스트레스DSR 3단계까지 적용. 계산법과 한도 늘리는 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/DSR-계산-한도-규제",
  },
  openGraph: {
    title: "DSR 때문에 대출이 안 된다면? 계산법과 한도",
    description: "은행 40%, 비은행 50% 한도. 스트레스DSR 3단계와 한도 늘리는 방법.",
    url: "https://www.jjyu.co.kr/w/DSR-계산-한도-규제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
