import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직금 IRP 의무 가입, 누구에게 해당되나요? | 머니위키",
  description: "퇴직금 IRP 의무 가입 대상과 금액 기준, 예외 대상, 위반 시 제재까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-irp-의무" },
  openGraph: { title: "퇴직금 IRP 의무 가입, 누구에게 해당되나요? | 머니위키", description: "퇴직금 IRP 의무 가입 대상과 금액 기준, 예외 대상, 위반 시 제재까지 정리했어요.", url: "https://www.jjyu.co.kr/w/퇴직금-irp-의무", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
