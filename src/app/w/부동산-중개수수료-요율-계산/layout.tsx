import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "복비 얼마 내야 하나요? 거래금액별 상한 요율과 계산법",
  description: "부동산 중개수수료는 공인중개사법 시행규칙으로 상한이 정해져 있어요. 매매·임대차 거래금액별 상한 요율표, 월세 보증금 환산 공식, 초과 시 환불 방법까지 한 번에 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/부동산-중개수수료-요율-계산",
  },
  openGraph: {
    title: "복비 얼마 내야 하나요? 거래금액별 상한 요율과 계산법",
    description: "매매·임대차별 상한 요율표, 월세 환산 공식, 초과 납부 환불 절차까지.",
    url: "https://www.jjyu.co.kr/w/부동산-중개수수료-요율-계산",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
