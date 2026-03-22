import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미등록 대부업체 불법 이자, 갚아야 할까? 원금 계산법 | 머니위키",
  description: "미등록 대부업체에 빌린 돈은 실수령액이 원금이에요. 법정 최고 이자율 연 20% 초과분은 상환 의무가 없고, 신고·대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/미등록-대부업체-불법-이자" },
  openGraph: {
    title: "미등록 대부업체 불법 이자, 갚아야 할까? 원금 계산법 | 머니위키",
    description: "미등록 대부업체에 빌린 돈은 실수령액이 원금이에요. 법정 최고 이자율 연 20% 초과분은 상환 의무가 없고, 신고·대응 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/미등록-대부업체-불법-이자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
