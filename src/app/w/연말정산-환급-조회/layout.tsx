import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 환급금 조회 방법 2026, 홈택스에서 확인하고 2월 급여 때 받아요",
  description: "연말정산 환급금을 홈택스에서 조회하는 방법과 2월 급여 지급 시기를 정리했어요. 미리보기·지급명세서 차이와 공제 누락 시 경정청구 방법도 있어요.",
  openGraph: {
    title: "연말정산 환급금 조회 방법 2026, 홈택스에서 확인하고 2월 급여 때 받아요 | 머니위키",
    description: "연말정산 환급금 조회 방법과 지급 시기, 공제 누락 시 경정청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-환급-조회",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-환급-조회" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
