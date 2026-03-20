import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재직 중에 퇴직금을 미리 받고 싶다면? 법정 사유부터 신청 절차·세금까지 | 머니위키",
  description: "퇴직금 중간정산은 주택 구입·의료비·파산 등 법정 사유가 있어야 가능해요. 사유별 조건, 증빙서류, 신청 절차 5단계, 세금 처리까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산" },
  openGraph: {
    title: "재직 중에 퇴직금을 미리 받고 싶다면? 법정 사유부터 신청 절차·세금까지 | 머니위키",
    description: "퇴직금 중간정산은 주택 구입·의료비·파산 등 법정 사유가 있어야 가능해요. 사유별 조건, 증빙서류, 신청 절차 5단계, 세금 처리까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
