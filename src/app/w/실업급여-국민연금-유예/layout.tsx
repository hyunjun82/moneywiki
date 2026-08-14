import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 국민연금 납부예외 신청 | 유예 기간 연금액 영향",
  description: "실업급여 받는 동안 국민연금 납부예외를 신청할 수 있다는 사실 알고 계셨나요? 유예하면 보험료 부담은 줄지만 가입기간이 끊겨서 연금액에 영향을 줘요. 납부예외 신청 방법과 실업크레딧 대안까지 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-국민연금-유예" },
  openGraph: { title: "실업급여 국민연금 납부예외 신청 | 유예 기간 연금액 영향 | 머니위키", description: "실업급여 받는 동안 국민연금 납부예외를 신청할 수 있다는 사실 알고 계셨나요? 유예하면 보험료 부담은 줄지만 가입기간이 끊겨서 연금액에 영향을 줘요. 납부예외 신청 방법과 실업크레딧 대안까지 알려드려요.", url: "https://www.jjyu.co.kr/w/실업급여-국민연금-유예", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
