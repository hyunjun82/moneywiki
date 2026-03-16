import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임금·퇴직금 미지급 이자, 얼마나 받을 수 있나요? | 머니위키",
  description: "임금과 퇴직금 미지급 시 연 20% 지연이자가 붙어요. 이자 계산법, 청구 절차, 회사가 거부할 때 대응 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금-퇴직금-미지급-이자" },
  openGraph: {
    title: "임금·퇴직금 미지급 이자, 얼마나 받을 수 있나요? | 머니위키",
    description: "임금과 퇴직금 미지급 시 연 20% 지연이자가 붙어요. 이자 계산법, 청구 절차, 회사가 거부할 때 대응 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임금-퇴직금-미지급-이자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
