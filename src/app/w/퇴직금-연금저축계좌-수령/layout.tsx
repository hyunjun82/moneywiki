import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 연금저축계좌 수령, IRP와 어떻게 다른가요? | 머니위키",
  description: "퇴직금을 연금저축계좌로 받을 수 있는지, IRP와의 차이는 뭔지, 세금은 어떻게 달라지는지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-연금저축계좌-수령" },
  openGraph: {
    title: "퇴직금 연금저축계좌 수령, IRP와 어떻게 다른가요? | 머니위키",
    description: "퇴직금을 연금저축계좌로 받을 수 있는지, IRP와의 차이는 뭔지, 세금은 어떻게 달라지는지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-연금저축계좌-수령",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
