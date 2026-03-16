import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 세금 환급, 받을 수 있는 경우는? | 머니위키",
  description: "IRP에서 연금으로 수령하거나 퇴직소득세가 과다 징수된 경우 세금 환급이 가능해요. 환급 조건, 신청 방법, 금액 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-세금-환급" },
  openGraph: {
    title: "퇴직금 세금 환급, 받을 수 있는 경우는? | 머니위키",
    description: "IRP에서 연금으로 수령하거나 퇴직소득세가 과다 징수된 경우 세금 환급이 가능해요. 환급 조건, 신청 방법, 금액 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-세금-환급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
