import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "먼 곳 면접, 교통비 받을 수 있을까? 광역구직활동비 기준과 금액",
  description: "거주지에서 50km 이상 떨어진 곳에 면접 가면 교통비와 숙박비를 받을 수 있어요. 광역구직활동비 조건, 금액, 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-광역구직활동비" },
  openGraph: {
    title: "먼 곳 면접, 교통비 받을 수 있을까? 광역구직활동비 기준과 금액 | 머니위키",
    description: "거주지에서 50km 이상 떨어진 곳에 면접 가면 교통비와 숙박비를 받을 수 있어요. 광역구직활동비 조건, 금액, 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-광역구직활동비",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
