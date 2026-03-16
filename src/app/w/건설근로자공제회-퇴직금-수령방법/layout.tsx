import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "건설근로자공제회 퇴직금 수령 방법, 어떻게 신청하나요? | 머니위키",
  description: "건설근로자공제회 퇴직공제금 수령 자격, 신청 방법, 금액 계산법을 단계별로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건설근로자공제회-퇴직금-수령방법" },
  openGraph: {
    title: "건설근로자공제회 퇴직금 수령 방법, 어떻게 신청하나요? | 머니위키",
    description: "건설근로자공제회 퇴직공제금 수령 자격, 신청 방법, 금액 계산법을 단계별로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/건설근로자공제회-퇴직금-수령방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
