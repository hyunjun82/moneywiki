import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지연이자, 연 20% 받는 방법은?",
  description: "퇴직금이 14일 넘게 안 들어오면 연 20% 지연이자가 붙어요. 자동 발생 여부, 계산법, 청구 방법과 주의할 점을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지연이자" },
  openGraph: {
    title: "퇴직금 지연이자, 연 20% 받는 방법은? | 머니위키",
    description: "퇴직금이 14일 넘게 안 들어오면 연 20% 지연이자가 붙어요. 자동 발생 여부, 계산법, 청구 방법과 주의할 점을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지연이자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
