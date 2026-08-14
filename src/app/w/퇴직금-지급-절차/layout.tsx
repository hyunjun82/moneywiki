import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 지급 절차, 퇴사 후 어떻게 진행되나요?",
  description: "퇴사 후 퇴직금이 지급되는 절차를 단계별로 정리했어요. 회사가 해야 할 일, 퇴직자가 준비할 것, IRP 지급 방법까지 한눈에 파악할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-지급-절차" },
  openGraph: {
    title: "퇴직금 지급 절차, 퇴사 후 어떻게 진행되나요? | 머니위키",
    description: "퇴사 후 퇴직금이 지급되는 절차를 단계별로 정리했어요. 회사가 해야 할 일, 퇴직자가 준비할 것, IRP 지급 방법까지 한눈에 파악할 수 있어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-지급-절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
