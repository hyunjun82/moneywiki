import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "IRP 계좌 퇴직금 수령 방법, 단계별 정리 | 머니위키",
  description: "IRP 계좌에서 퇴직금을 수령하는 단계별 방법을 정리했어요. 중도 인출과 만기 수령 비교, 세금 처리까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/irp-계좌-퇴직금-수령방법" },
  openGraph: { title: "IRP 계좌 퇴직금 수령 방법, 단계별 정리 | 머니위키", description: "IRP 계좌에서 퇴직금을 수령하는 단계별 방법을 정리했어요. 중도 인출과 만기 수령 비교, 세금 처리까지 안내해요.", url: "https://www.jjyu.co.kr/w/irp-계좌-퇴직금-수령방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
