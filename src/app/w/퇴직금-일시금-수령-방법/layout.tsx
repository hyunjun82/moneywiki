import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 일시금 수령, 어떻게 신청하나요? | 머니위키",
  description: "퇴직금을 일시금으로 받는 방법과 IRP 의무 예외 조건을 정리했어요. 일시금 수령 시 세금 처리와 주의할 점까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-일시금-수령-방법" },
  openGraph: {
    title: "퇴직금 일시금 수령, 어떻게 신청하나요? | 머니위키",
    description: "퇴직금을 일시금으로 받는 방법과 IRP 의무 예외 조건을 정리했어요. 일시금 수령 시 세금 처리와 주의할 점까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-일시금-수령-방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
