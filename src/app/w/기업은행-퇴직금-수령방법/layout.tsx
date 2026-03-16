import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "기업은행 퇴직금 수령 방법, 단계별 신청 절차 | 머니위키",
  description: "기업은행 IRP 계좌에서 퇴직금을 수령하는 단계별 절차를 정리했어요. i-ONE뱅크 앱 신청법과 세금 처리까지 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기업은행-퇴직금-수령방법" },
  openGraph: {
    title: "기업은행 퇴직금 수령 방법, 단계별 신청 절차 | 머니위키",
    description: "기업은행 IRP 계좌에서 퇴직금을 수령하는 단계별 절차를 정리했어요. i-ONE뱅크 앱 신청법과 세금 처리까지 안내해요.",
    url: "https://www.jjyu.co.kr/w/기업은행-퇴직금-수령방법",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
