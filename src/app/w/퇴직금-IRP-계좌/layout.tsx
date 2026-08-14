import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 IRP 계좌, 꼭 만들어야 하나요?",
  description: "퇴직금 수령을 위한 IRP 계좌 개설이 필수인지, 어디서 만드는지, 수수료는 얼마인지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-IRP-계좌" },
  openGraph: {
    title: "퇴직금 IRP 계좌, 꼭 만들어야 하나요? | 머니위키",
    description: "퇴직금 수령을 위한 IRP 계좌 개설이 필수인지, 어디서 만드는지, 수수료는 얼마인지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-IRP-계좌",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
