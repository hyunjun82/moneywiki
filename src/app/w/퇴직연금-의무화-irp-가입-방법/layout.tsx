import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 의무화와 IRP 가입 방법 — 55세 미만은 IRP 필수 | 머니위키",
  description: "2022년 4월부터 55세 미만 퇴직자는 IRP로만 퇴직금을 받을 수 있어요. IRP 개설 방법, 예외 조건, 인출 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-의무화-irp-가입-방법" },
  openGraph: {
    title: "퇴직연금 의무화와 IRP 가입 방법 — 55세 미만은 IRP 필수 | 머니위키",
    description: "2022년 4월부터 55세 미만 퇴직자는 IRP로만 퇴직금을 받을 수 있어요. IRP 개설 방법, 예외 조건, 인출 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-의무화-irp-가입-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
