import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "1년 미만 퇴직금 지급 규정, 알바도 해당될까? | 머니위키",
  description: "알바라도 주 15시간 이상, 1년 이상 근무하면 퇴직금 대상이에요. 단기·장기 계약 차이, 거부 시 대응법, 소액 퇴직금 신고까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/1년미만-퇴직금-지급규정" },
  openGraph: {
    title: "1년 미만 퇴직금 지급 규정, 알바도 해당될까? | 머니위키",
    description: "알바라도 주 15시간 이상, 1년 이상 근무하면 퇴직금 대상이에요. 단기·장기 계약 차이, 거부 시 대응법, 소액 퇴직금 신고까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/1년미만-퇴직금-지급규정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
