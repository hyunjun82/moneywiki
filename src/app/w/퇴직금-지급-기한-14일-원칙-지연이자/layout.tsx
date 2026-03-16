import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 14일 지급 원칙, 어기면 지연이자가 붙나요? | 머니위키",
  description: "퇴직금은 14일 이내 지급이 원칙이고, 어기면 연 20% 지연이자가 자동으로 붙어요. 14일 원칙의 정확한 기준과 지연이자 계산법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-14일-원칙-지연이자" },
  openGraph: {
    title: "퇴직금 14일 지급 원칙, 어기면 지연이자가 붙나요? | 머니위키",
    description: "퇴직금은 14일 이내 지급이 원칙이고, 어기면 연 20% 지연이자가 자동으로 붙어요. 14일 원칙의 정확한 기준과 지연이자 계산법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-기한-14일-원칙-지연이자",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
