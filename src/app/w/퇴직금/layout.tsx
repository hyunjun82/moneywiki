import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금, 나는 얼마 받을 수 있을까? 계산법부터 수령 절차까지 | 머니위키",
  description: "퇴직금 계산기로 내 금액 바로 확인하고, IRP 개설부터 입금까지 수령 절차를 4단계로 따라가봐요. 14일 넘기면 연 20% 지연이자도 청구할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금" },
  openGraph: {
    title: "퇴직금, 나는 얼마 받을 수 있을까? 계산법부터 수령 절차까지 | 머니위키",
    description: "퇴직금 계산기로 내 금액 바로 확인하고, IRP 개설부터 입금까지 수령 절차를 4단계로 따라가봐요.",
    url: "https://www.jjyu.co.kr/w/퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
