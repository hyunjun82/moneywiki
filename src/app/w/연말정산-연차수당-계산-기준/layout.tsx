import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연차수당, 세금이 얼마나 빠지나요? 계산 기준부터 연말정산 반영까지 | 머니위키",
  description: "연차수당은 1일 통상임금 × 미사용 일수로 계산하고 전액 과세돼요. 월급 300만원에 5일 미사용이면 약 57만원이고 소득세가 원천징수된 후 지급돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-연차수당-계산-기준",
  },
  openGraph: {
    title: "연차수당 계산 기준과 연말정산 반영 방법",
    description: "1일 통상임금 × 미사용 일수, 전액 근로소득 과세. 계산 예시와 사용촉진 제도까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-연차수당-계산-기준",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
