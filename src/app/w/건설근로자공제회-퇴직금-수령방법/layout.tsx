import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건설근로자공제회 퇴직금, 받을 수 있을까요? 자격 조건부터 청구 절차까지 | 머니위키",
  description: "건설근로자공제회 퇴직공제금 수급 자격(적립일수 252일), 예상 금액 계산, 청구 서류, 4단계 신청 절차를 단계별로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건설근로자공제회-퇴직금-수령방법" },
  openGraph: {
    title: "건설근로자공제회 퇴직금, 받을 수 있을까요? 자격 조건부터 청구 절차까지 | 머니위키",
    description: "건설근로자공제회 퇴직공제금 수급 자격(적립일수 252일), 예상 금액 계산, 청구 서류, 4단계 신청 절차를 단계별로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/건설근로자공제회-퇴직금-수령방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
