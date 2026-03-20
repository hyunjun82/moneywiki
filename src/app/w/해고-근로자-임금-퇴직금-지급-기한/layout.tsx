import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "해고됐는데 임금·퇴직금을 못 받았나요? 지급 기한과 청구 절차 | 머니위키",
  description: "해고 시 임금·퇴직금은 14일 이내 지급 의무예요. 해고예고수당, 연 20% 지연이자, 고용노동부 신고 절차까지 다뤄요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/해고-근로자-임금-퇴직금-지급-기한" },
  openGraph: {
    title: "해고됐는데 임금·퇴직금을 못 받았나요? 지급 기한과 청구 절차 | 머니위키",
    description: "해고 시 임금·퇴직금은 14일 이내 지급 의무예요. 해고예고수당, 연 20% 지연이자, 고용노동부 신고 절차까지 다뤄요.",
    url: "https://www.jjyu.co.kr/w/해고-근로자-임금-퇴직금-지급-기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
