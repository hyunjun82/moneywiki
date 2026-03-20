import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DC형 퇴직금, 어떻게 받나요? 잔액 확인·IRP 이전·연금 선택 절차 | 머니위키",
  description: "DC형(확정기여형) 퇴직연금 수령 방법을 4단계로 정리했어요. IRP 이전 조건, 운용 손실 시 차액 보전, 연금 수령 절세 40%까지 다뤄요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/dc형-퇴직금-수령방법" },
  openGraph: {
    title: "DC형 퇴직금, 어떻게 받나요? 잔액 확인·IRP 이전·연금 선택 절차 | 머니위키",
    description: "DC형(확정기여형) 퇴직연금 수령 방법을 4단계로 정리했어요. IRP 이전 조건, 운용 손실 시 차액 보전, 연금 수령 절세 40%까지 다뤄요.",
    url: "https://www.jjyu.co.kr/w/dc형-퇴직금-수령방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
