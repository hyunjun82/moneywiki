import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "야간근로 수당, 시급 대비 얼마 더 받나요? 50% 가산 계산법과 청구 방법 | 머니위키",
  description: "22시~06시 근로 시 통상임금의 50% 가산이 법적 의무예요. 연장·휴일 중복 시 최대 200% 가산. 계산 공식과 미지급 시 청구 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/야간근로-수당-계산-방법",
  },
  openGraph: {
    title: "야간근로 수당, 시급 대비 얼마 더 받나요? 50% 가산 계산법과 청구 방법",
    description: "야간(22~06시) 50% 가산 의무. 중복 시 최대 200%. 계산기와 청구법.",
    url: "https://www.jjyu.co.kr/w/야간근로-수당-계산-방법",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
