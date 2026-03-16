import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 미지급 신고 절차와 지연이자 청구 방법 | 머니위키",
  description: "퇴직금을 못 받았다면 노동청 진정과 지연이자(연 20%)를 동시에 청구할 수 있어요. 신고 절차, 이자 계산법, 합의 대응까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-미지급-신고-절차-지연이자-청구" },
  openGraph: {
    title: "퇴직금 미지급 신고 절차와 지연이자 청구 방법 | 머니위키",
    description: "퇴직금을 못 받았다면 노동청 진정과 지연이자(연 20%)를 동시에 청구할 수 있어요. 신고 절차, 이자 계산법, 합의 대응까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-미지급-신고-절차-지연이자-청구",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
