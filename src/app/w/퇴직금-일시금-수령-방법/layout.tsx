import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 일시금으로 받으려면 어떻게 하나요? | 머니위키",
  description: "IRP 계좌에서 퇴직금 일시금 인출하는 4단계 절차와 세후 수령액 계산법이에요. 300만원 초과 IRP 의무, 세금 자동 차감 방식, 연금과 세금 차이까지 다뤄요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-일시금-수령-방법" },
  openGraph: {
    title: "퇴직금 일시금으로 받으려면 어떻게 하나요? | 머니위키",
    description: "IRP 계좌에서 퇴직금 일시금 인출하는 4단계 절차와 세후 수령액 계산법이에요. 300만원 초과 IRP 의무, 세금 자동 차감 방식, 연금과 세금 차이까지 다뤄요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-일시금-수령-방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
