import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자영업자도 실업급여 받을 수 있을까? 수급 조건과 신청 방법",
  description: "자영업자 고용보험에 가입하면 폐업 시 실업급여를 받을 수 있어요. 피보험기간 12개월, 정당한 폐업 사유, 기준보수 등급별 금액, 신청 절차 5단계를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자영업자-실업급여-수급-조건-및-신청-방법" },
  openGraph: {
    title: "자영업자도 실업급여 받을 수 있을까? 수급 조건과 신청 방법 | 머니위키",
    description: "자영업자 고용보험에 가입하면 폐업 시 실업급여를 받을 수 있어요. 피보험기간 12개월, 정당한 폐업 사유, 기준보수 등급별 금액, 신청 절차 5단계를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/자영업자-실업급여-수급-조건-및-신청-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
