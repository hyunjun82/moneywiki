import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보훈급여금, 누가 받을 수 있을까? 대상 확인부터 신청 방법까지",
  description: "보훈급여금 대상 여부를 확인하고 보훈지청 또는 정부24에서 신청하는 방법을 정리했어요. 국가유공자, 참전유공자, 유족 모두 해당될 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보훈급여금-신청방법-대상-조회" },
  openGraph: {
    title: "보훈급여금, 누가 받을 수 있을까? 대상 확인부터 신청 방법까지 | 머니위키",
    description: "보훈급여금 대상 여부를 확인하고 보훈지청 또는 정부24에서 신청하는 방법을 정리했어요. 국가유공자, 참전유공자, 유족 모두 해당될 수 있어요.",
    url: "https://www.jjyu.co.kr/w/보훈급여금-신청방법-대상-조회",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
