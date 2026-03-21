import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "DSR 계산 방법, 내 연봉으로 얼마까지 빌릴 수 있을까? | 머니위키",
  description: "DSR은 연소득 대비 모든 대출 원리금 비율이에요. 은행 40%, 비은행 50% 기준으로 연봉별 최대 대출 한도와 스트레스 DSR 적용 후 변화까지 계산 예시로 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/DSR-계산-방법" },
  openGraph: {
    title: "DSR 계산 방법, 내 연봉으로 얼마까지 빌릴 수 있을까? | 머니위키",
    description: "DSR은 연소득 대비 모든 대출 원리금 비율이에요. 은행 40%, 비은행 50% 기준으로 연봉별 최대 대출 한도와 스트레스 DSR 적용 후 변화까지 계산 예시로 정리했어요.",
    url: "https://www.jjyu.co.kr/w/DSR-계산-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
