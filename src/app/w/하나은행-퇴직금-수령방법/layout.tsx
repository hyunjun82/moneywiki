import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "하나은행 퇴직금 수령 방법, 어떻게 진행하나요?",
  description: "하나은행 IRP 계좌에서 퇴직금을 수령하는 방법을 정리했어요. 하나원큐 앱 신청법, 필요 서류, 세금 처리까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/하나은행-퇴직금-수령방법" },
  openGraph: {
    title: "하나은행 퇴직금 수령 방법, 어떻게 진행하나요? | 머니위키",
    description: "하나은행 IRP 계좌에서 퇴직금을 수령하는 방법을 정리했어요. 하나원큐 앱 신청법, 필요 서류, 세금 처리까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/하나은행-퇴직금-수령방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
