import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "해고 근로자 임금·퇴직금 지급 기한, 언제까지인가요?",
  description: "해고 시 임금과 퇴직금은 퇴직일로부터 14일 이내에 지급해야 해요. 기한 초과 시 지연이자와 신고 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/해고-근로자-임금-퇴직금-지급-기한" },
  openGraph: {
    title: "해고 근로자 임금·퇴직금 지급 기한, 언제까지인가요? | 머니위키",
    description: "해고 시 임금과 퇴직금은 퇴직일로부터 14일 이내에 지급해야 해요. 기한 초과 시 지연이자와 신고 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/해고-근로자-임금-퇴직금-지급-기한",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
