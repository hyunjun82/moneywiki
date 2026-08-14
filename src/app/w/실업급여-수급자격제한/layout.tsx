import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 수급자격제한 사유 | 자발적 퇴사 예외 인정 조건",
  description: "자발적으로 퇴사하면 실업급여를 못 받는다는 거 알고 계셨나요? 수급자격제한 사유와 그래도 받을 수 있는 예외 인정 조건을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급자격제한" },
  openGraph: { title: "실업급여 수급자격제한 사유 | 자발적 퇴사 예외 인정 조건 | 머니위키", description: "자발적으로 퇴사하면 실업급여를 못 받는다는 거 알고 계셨나요? 수급자격제한 사유와 그래도 받을 수 있는 예외 인정 조건을 알려드려요.", url: "https://www.jjyu.co.kr/w/실업급여-수급자격제한", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
