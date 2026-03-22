import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전월세상한제, 5% 인상 한도 어떻게 계산하나요? 보증금·월세 계산법 | 머니위키",
  description: "갱신 시 보증금과 월세 각각 5%까지만 올릴 수 있어요. 현재 금액 × 1.05가 최대 갱신 금액이고, 보증금과 월세는 따로 계산해요. 반전세·전환 시 환산보증금 기준도 적용돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/전월세상한제-계산",
  },
  openGraph: {
    title: "전월세상한제, 5% 인상 한도 어떻게 계산하나요?",
    description: "보증금 × 1.05 = 최대 갱신 금액. 보증금·월세 각각 5% 따로 계산.",
    url: "https://www.jjyu.co.kr/w/전월세상한제-계산",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
