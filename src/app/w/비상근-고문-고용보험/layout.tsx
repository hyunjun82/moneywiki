import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "비상근 고문 고용보험 가입 조건 | 근로자성 판단 기준 | 머니위키",
  description: "비상근 고문은 위촉 계약이라 고용보험 가입이 안 된다는 사실, 알고 계셨나요? 실질적인 출퇴근 기준과 근로자성 판단 기준을 충족하면 가입이 인정되는 예외 조건과 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/비상근-고문-고용보험" },
  openGraph: { title: "비상근 고문 고용보험 가입 조건 | 근로자성 판단 기준 | 머니위키", description: "비상근 고문은 위촉 계약이라 고용보험 가입이 안 된다는 사실, 알고 계셨나요? 실질적인 출퇴근 기준과 근로자성 판단 기준을 충족하면 가입이 인정되는 예외 조건과 방법을 알려드려요.", url: "https://www.jjyu.co.kr/w/비상근-고문-고용보험", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
