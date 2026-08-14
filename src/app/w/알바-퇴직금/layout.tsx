import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "알바 퇴직금, 단기 알바도 받을 수 있나요?",
  description: "알바도 1년 이상 주 15시간 이상 근무했다면 퇴직금을 받을 수 있어요. 사장이 안 준다고 해도 법적 권리이니 신고 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/알바-퇴직금" },
  openGraph: {
    title: "알바 퇴직금, 단기 알바도 받을 수 있나요? | 머니위키",
    description: "알바도 1년 이상 주 15시간 이상 근무했다면 퇴직금을 받을 수 있어요. 사장이 안 준다고 해도 법적 권리이니 신고 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/알바-퇴직금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
