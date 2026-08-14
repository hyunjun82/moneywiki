import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자영업자 폐업하면 실업급여? 가입 조건과 수급기간",
  description: "자영업자도 고용보험에 미리 가입하면 폐업 후 실업급여를 받을 수 있어요. 가입 조건, 보험료, 수급 요건, 금액 계산까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자영업자-실업급여" },
  openGraph: {
    title: "자영업자 폐업하면 실업급여? 가입 조건과 수급기간 | 머니위키",
    description: "자영업자도 고용보험에 미리 가입하면 폐업 후 실업급여를 받을 수 있어요. 가입 조건, 보험료, 수급 요건, 금액 계산까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/자영업자-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
