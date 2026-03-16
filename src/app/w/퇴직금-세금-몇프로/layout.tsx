import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 세금, 몇 퍼센트나 나가나요? 퇴직소득세 계산법 | 머니위키",
  description: "퇴직금 세율은 근속기간에 따라 달라요. 근속연수공제부터 IRP 절세까지, 퇴직소득세 계산 방법을 단계별로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-세금-몇프로" },
  openGraph: {
    title: "퇴직금 세금, 몇 퍼센트나 나가나요? 퇴직소득세 계산법 | 머니위키",
    description: "퇴직금 세율은 근속기간에 따라 달라요. 근속연수공제부터 IRP 절세까지, 퇴직소득세 계산 방법을 단계별로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-세금-몇프로",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
