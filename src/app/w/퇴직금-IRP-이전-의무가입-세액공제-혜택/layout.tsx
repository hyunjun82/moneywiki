import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 IRP 의무 이전, 세액공제까지 받는 방법 | 머니위키",
  description: "퇴직금 300만원 초과 시 IRP 의무 이전 대상이에요. 개설 절차부터 세액공제 환급액 계산, 연말정산 신청 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-IRP-이전-의무가입-세액공제-혜택" },
  openGraph: {
    title: "퇴직금 IRP 의무 이전, 세액공제까지 받는 방법 | 머니위키",
    description: "퇴직금 300만원 초과 시 IRP 의무 이전 대상이에요. 개설 절차부터 세액공제 환급액 계산, 연말정산 신청 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-IRP-이전-의무가입-세액공제-혜택",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
