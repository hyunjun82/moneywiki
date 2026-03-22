import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자영업자도 실업급여 받을 수 있나? 가입 조건과 신청 방법 | 머니위키",
  description: "자영업자 고용보험에 1년 이상 가입하면 폐업 시 실업급여를 받을 수 있어요. 월 보험료 8만원대, 최대 210일 지급되죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자영업자-실업급여-받기" },
  openGraph: {
    title: "자영업자도 실업급여 받을 수 있나? 가입 조건과 신청 방법 | 머니위키",
    description: "자영업자 고용보험에 1년 이상 가입하면 폐업 시 실업급여를 받을 수 있어요. 월 보험료 8만원대, 최대 210일 지급되죠.",
    url: "https://www.jjyu.co.kr/w/자영업자-실업급여-받기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
