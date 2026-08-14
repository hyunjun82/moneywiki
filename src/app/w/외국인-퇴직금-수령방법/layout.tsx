import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "외국인 퇴직금 수령 방법, 귀국 전에 받을 수 있나요?",
  description: "외국인 근로자도 퇴직금을 받을 수 있어요. 비자 종류별 차이, 출국만기보험, 귀국 전 수령 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/외국인-퇴직금-수령방법" },
  openGraph: {
    title: "외국인 퇴직금 수령 방법, 귀국 전에 받을 수 있나요? | 머니위키",
    description: "외국인 근로자도 퇴직금을 받을 수 있어요. 비자 종류별 차이, 출국만기보험, 귀국 전 수령 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/외국인-퇴직금-수령방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
