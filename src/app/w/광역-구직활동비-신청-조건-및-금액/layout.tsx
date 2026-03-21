import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "광역 구직활동비, 먼 곳 면접 교통비 신청 조건과 금액 | 머니위키",
  description: "거주지에서 25km 이상 떨어진 면접에 교통비·숙박비를 실비로 받을 수 있어요. 신청 조건, 상한액, 필요 서류, 14일 이내 제출 절차까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/광역-구직활동비-신청-조건-및-금액" },
  openGraph: {
    title: "광역 구직활동비, 먼 곳 면접 교통비 신청 조건과 금액 | 머니위키",
    description: "거주지에서 25km 이상 떨어진 면접에 교통비·숙박비를 실비로 받을 수 있어요. 신청 조건, 상한액, 필요 서류, 14일 이내 제출 절차까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/광역-구직활동비-신청-조건-및-금액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
