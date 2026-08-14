import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 실업크레딧 국민연금 75% 지원 | 신청 방법 최대 12개월",
  description: "실업크레딧으로 국민연금 보험료의 75%를 국가에서 대신 내준다는 거 아시나요? 실업급여 받는 동안 최대 12개월까지 지원받을 수 있어요. 신청 방법과 본인 부담 금액을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-실업크레딧" },
  openGraph: { title: "실업급여 실업크레딧 국민연금 75% 지원 | 신청 방법 최대 12개월 | 머니위키", description: "실업크레딧으로 국민연금 보험료의 75%를 국가에서 대신 내준다는 거 아시나요? 실업급여 받는 동안 최대 12개월까지 지원받을 수 있어요. 신청 방법과 본인 부담 금액을 정리했어요.", url: "https://www.jjyu.co.kr/w/실업급여-실업크레딧", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
