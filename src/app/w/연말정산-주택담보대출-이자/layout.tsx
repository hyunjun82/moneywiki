import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주담대 이자 연말정산, 최대 2,000만원 소득공제 조건 정리",
  description: "주택담보대출 이자 소득공제는 상환기간·금리유형에 따라 600~2,000만원 한도예요. 15년 이상 고정금리 비거치식이면 최대 한도를 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-주택담보대출-이자",
  },
  openGraph: {
    title: "주담대 이자 소득공제, 최대 2,000만원 한도",
    description: "상환기간·금리별 한도와 절세 시뮬레이션. 2024년부터 기준시가 6억 이하로 완화.",
    url: "https://www.jjyu.co.kr/w/연말정산-주택담보대출-이자",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
