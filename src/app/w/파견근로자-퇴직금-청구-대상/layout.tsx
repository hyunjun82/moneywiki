import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "파견 근로자 퇴직금 청구 대상, 누구에게 해야 하나요?",
  description: "파견 근로자 퇴직금은 파견 업체가 지급 의무를 져요. 파견 기간 종료 시 퇴직금 처리와 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/파견근로자-퇴직금-청구-대상" },
  openGraph: {
    title: "파견 근로자 퇴직금 청구 대상, 누구에게 해야 하나요? | 머니위키",
    description: "파견 근로자 퇴직금은 파견 업체가 지급 의무를 져요. 파견 기간 종료 시 퇴직금 처리와 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/파견근로자-퇴직금-청구-대상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
