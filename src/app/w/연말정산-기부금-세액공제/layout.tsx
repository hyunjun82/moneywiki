import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 기부금 세액공제, 종류별 공제율과 한도",
  description: "기부금 종류별 공제율 15~100%, 고향사랑기부금 10만원 전액 환급과 답례품 혜택, 한도 2,000만원 상향 등 2025년 귀속 기부금 세액공제를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-기부금-세액공제",
  },
  openGraph: {
    title: "연말정산 기부금 세액공제, 종류별 공제율과 한도",
    description: "고향사랑기부금 10만원 전액 환급, 법정·지정기부금 15~30% 공제율, 한도와 이월 규정을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-기부금-세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
