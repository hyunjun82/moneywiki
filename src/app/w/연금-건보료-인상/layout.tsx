import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연금 받는데 건보료가 올랐다면? 인상 원인과 조정 신청 방법",
  description: "국민연금은 50%만 건보료에 반영돼요. 진짜 원인은 이자·배당·임대소득이에요. 2026년 건보료율 7.19% 기준 계산과 조정 신청 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연금-건보료-인상" },
  openGraph: {
    title: "연금 받는데 건보료가 올랐다면? 인상 원인과 조정 신청 방법 | 머니위키",
    description: "국민연금은 50%만 건보료에 반영돼요. 진짜 원인은 이자·배당·임대소득이에요. 2026년 건보료율 7.19% 기준 계산과 조정 신청 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연금-건보료-인상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
