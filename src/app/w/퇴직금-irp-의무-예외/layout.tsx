import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직금 IRP 의무 예외, 해당되는 경우는?",
  description: "퇴직금 IRP 의무 예외 조건을 정리했어요. 55세 이상, 소액 퇴직금 등 일반 계좌로 받을 수 있는 경우를 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-irp-의무-예외" },
  openGraph: { title: "퇴직금 IRP 의무 예외, 해당되는 경우는? | 머니위키", description: "퇴직금 IRP 의무 예외 조건을 정리했어요. 55세 이상, 소액 퇴직금 등 일반 계좌로 받을 수 있는 경우를 안내해요.", url: "https://www.jjyu.co.kr/w/퇴직금-irp-의무-예외", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
