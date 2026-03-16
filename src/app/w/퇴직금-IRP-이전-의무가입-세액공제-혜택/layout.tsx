import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 IRP 이전과 세액공제, 어떻게 활용하나요? | 머니위키",
  description: "퇴직금을 IRP로 이전하면 세금 유예와 세액공제 혜택을 동시에 받을 수 있어요. IRP 이전 절차와 세액공제 활용법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-IRP-이전-의무가입-세액공제-혜택" },
  openGraph: {
    title: "퇴직금 IRP 이전과 세액공제, 어떻게 활용하나요? | 머니위키",
    description: "퇴직금을 IRP로 이전하면 세금 유예와 세액공제 혜택을 동시에 받을 수 있어요. IRP 이전 절차와 세액공제 활용법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-IRP-이전-의무가입-세액공제-혜택",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
