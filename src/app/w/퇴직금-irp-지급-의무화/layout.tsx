import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직금 IRP로만 줘야 한다는데, 나도 해당되나요? | 머니위키",
  description: "퇴직금 300만원 초과·만 55세 미만이면 IRP 계좌로만 받을 수 있어요. 의무 대상 체크부터 IRP 개설, 14일 수령 절차까지 한 번에 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-irp-지급-의무화" },
  openGraph: { title: "퇴직금 IRP로만 줘야 한다는데, 나도 해당되나요? | 머니위키", description: "퇴직금 300만원 초과·만 55세 미만이면 IRP 계좌로만 받을 수 있어요. 의무 대상 체크부터 IRP 개설, 14일 수령 절차까지 한 번에 정리했어요.", url: "https://www.jjyu.co.kr/w/퇴직금-irp-지급-의무화", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
