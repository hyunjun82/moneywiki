import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전월세신고, 내 계약도 해야 할까? 대상 기준과 신고 방법 | 머니위키",
  description: "보증금 6천만원 초과 또는 월세 30만원 초과면 30일 이내에 전월세신고를 해야 해요. 온라인으로 10분이면 끝나죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전월세신고" },
  openGraph: {
    title: "전월세신고, 내 계약도 해야 할까? 대상 기준과 신고 방법 | 머니위키",
    description: "보증금 6천만원 초과 또는 월세 30만원 초과면 30일 이내에 전월세신고를 해야 해요. 온라인으로 10분이면 끝나죠.",
    url: "https://www.jjyu.co.kr/w/전월세신고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
