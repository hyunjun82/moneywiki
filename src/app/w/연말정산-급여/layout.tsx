import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 급여, 내 총급여 확인 방법과 비과세 항목",
  description: "연말정산에서 총급여는 연간 급여에서 비과세 소득을 뺀 금액이에요. 식대 20만원, 자가운전 20만원 등 비과세 항목과 총급여 확인 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-급여",
  },
  openGraph: {
    title: "연말정산 급여, 내 총급여 확인 방법과 비과세 항목",
    description: "총급여 = 연간 급여 합계 - 비과세 소득. 비과세 항목과 총급여 구간별 공제 차이를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-급여",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
