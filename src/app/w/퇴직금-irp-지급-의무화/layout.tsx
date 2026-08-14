import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직금 IRP 지급 의무화, 언제부터 어떻게 바뀌었나요?",
  description: "퇴직금 IRP 지급 의무화 시행 시기와 전후 차이, 예외 규정, 위반 시 제재를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-irp-지급-의무화" },
  openGraph: { title: "퇴직금 IRP 지급 의무화, 언제부터 어떻게 바뀌었나요? | 머니위키", description: "퇴직금 IRP 지급 의무화 시행 시기와 전후 차이, 예외 규정, 위반 시 제재를 정리했어요.", url: "https://www.jjyu.co.kr/w/퇴직금-irp-지급-의무화", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
