import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세보증보험, 꼭 가입해야 할까? 가입 조건과 보증료 계산 | 머니위키",
  description: "전세보증보험에 가입하면 집주인이 보증금 못 줘도 보증기관이 대신 지급해요. HUG 보증료 연 0.115~0.154%, 가입 조건, 거절 시 대처법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세보증보험" },
  openGraph: {
    title: "전세보증보험, 꼭 가입해야 할까? 가입 조건과 보증료 계산 | 머니위키",
    description: "전세보증보험에 가입하면 집주인이 보증금 못 줘도 보증기관이 대신 지급해요. HUG 보증료 연 0.115~0.154%, 가입 조건, 거절 시 대처법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/전세보증보험",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
