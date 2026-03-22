import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "학자금 대출, 당장 못 갚겠다면? — 상환유예 조건과 신청 방법 | 머니위키",
  description: "ICL은 소득 연 3,037만원 이하면 자동 유예, 일반상환은 특별상환유예대출(3년 유예+4년 무이자)을 신청할 수 있어요. 조건·절차 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/학자금-대출-상환-유예-신청" },
  openGraph: {
    title: "학자금 대출, 당장 못 갚겠다면? — 상환유예 조건과 신청 방법 | 머니위키",
    description: "ICL은 소득 연 3,037만원 이하면 자동 유예, 일반상환은 특별상환유예대출(3년 유예+4년 무이자)을 신청할 수 있어요. 조건·절차 정리했어요.",
    url: "https://www.jjyu.co.kr/w/학자금-대출-상환-유예-신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
