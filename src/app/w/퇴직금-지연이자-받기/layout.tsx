import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지연이자 받기, 실제로 가능한가요? | 머니위키",
  description: "퇴직금 지연이자는 실제로 받을 수 있어요. 연 20% 이율의 청구 절차, 계산법, 회사 거부 시 대응법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지연이자-받기" },
  openGraph: {
    title: "퇴직금 지연이자 받기, 실제로 가능한가요? | 머니위키",
    description: "퇴직금 지연이자는 실제로 받을 수 있어요. 연 20% 이율의 청구 절차, 계산법, 회사 거부 시 대응법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지연이자-받기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
