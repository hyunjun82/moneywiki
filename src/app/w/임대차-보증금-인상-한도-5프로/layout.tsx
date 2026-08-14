import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보증금 인상 한도 5%, 초과 요구 시 거절하는 방법",
  description: "주택임대차보호법에 따라 보증금 인상은 기존 금액의 5% 이내로 제한돼요. 보증금 5천만원이면 최대 250만원. 초과 요구 거절 방법과 계산법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/임대차-보증금-인상-한도-5프로",
  },
  openGraph: {
    title: "보증금 인상 한도 5%, 초과 요구 시 거절하는 방법",
    description: "5천만원 보증금이면 최대 250만원 인상. 거절 근거와 절차.",
    url: "https://www.jjyu.co.kr/w/임대차-보증금-인상-한도-5프로",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
