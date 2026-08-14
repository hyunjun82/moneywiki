import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 기준기간 18개월 피보험 180일 합산 계산법",
  description: "기준기간(이직일 이전 18개월)과 피보험단위기간(180일) 차이, 여러 직장 합산 조건, 기준기간 연장 사유까지 정리했어요.",
  openGraph: {
    title: "실업급여 기준기간 18개월 피보험 180일 합산 계산법",
    description: "18개월 기준기간 안에 피보험단위기간 180일을 채우는 방법. 여러 직장 합산과 기준기간 연장 조건 포함.",
    url: "https://jjyu.co.kr/w/실업급여-기준기간",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/실업급여-기준기간",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
