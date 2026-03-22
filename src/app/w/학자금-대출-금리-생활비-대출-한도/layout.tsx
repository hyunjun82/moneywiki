import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "학자금 대출 금리 1.7%와 생활비 대출 한도 200만원 | 머니위키",
  description: "2026년 학자금 대출 금리는 1.7%로 6년 동결 중이에요. 등록금 전액, 생활비 학기당 200만원까지 대출 가능하고 소득구간 기준과 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/학자금-대출-금리-생활비-대출-한도" },
  openGraph: {
    title: "학자금 대출 금리 1.7%와 생활비 대출 한도 200만원 | 머니위키",
    description: "2026년 학자금 대출 금리는 1.7%로 6년 동결 중이에요. 등록금 전액, 생활비 학기당 200만원까지 대출 가능하고 소득구간 기준과 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/학자금-대출-금리-생활비-대출-한도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
