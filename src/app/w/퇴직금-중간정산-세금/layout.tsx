import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 중간정산 받으면 세금이 얼마나 나오나요? | 머니위키",
  description: "퇴직금 중간정산 시 퇴직소득세가 부과돼요. 정산 시점 과세 구조, 기산점 리셋, IRP 절세 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-중간정산-세금" },
  openGraph: {
    title: "퇴직금 중간정산 받으면 세금이 얼마나 나오나요? | 머니위키",
    description: "퇴직금 중간정산 시 퇴직소득세가 부과돼요. 정산 시점 과세 구조, 기산점 리셋, IRP 절세 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-중간정산-세금",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
