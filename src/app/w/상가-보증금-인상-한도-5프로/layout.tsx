import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "상가 보증금 5% 넘게 올려달라고요? 법적 한도와 거절 방법 | 머니위키",
  description: "상가건물임대차보호법에 따라 보증금·월세 인상은 각각 5% 이내로만 가능해요. 환산보증금 지역별 기준, 1년 이내 재인상 금지 규칙, 거절 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/상가-보증금-인상-한도-5프로",
  },
  openGraph: {
    title: "상가 보증금 5% 넘게 올려달라고요? 법적 한도와 거절 방법",
    description: "5% 상한, 1년 제한, 환산보증금 기준. 상가 임차인의 법적 권리를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/상가-보증금-인상-한도-5프로",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
