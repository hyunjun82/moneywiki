import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부당해고 무료 법률지원 받는 방법",
  description: "부당해고 당했을 때 공인노무사·변호사 무료 상담부터 소송까지 지원받는 방법이에요. 고용노동부·법률구조공단·근로복지공단 이용법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부당해고-공인노무사-무료법률지원" },
  openGraph: {
    title: "부당해고 무료 법률지원 받는 방법 | 머니위키",
    description: "부당해고 당했을 때 공인노무사·변호사 무료 상담부터 소송까지 지원받는 방법이에요. 고용노동부·법률구조공단·근로복지공단 이용법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/부당해고-공인노무사-무료법률지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
