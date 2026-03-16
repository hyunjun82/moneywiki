import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약직 퇴직금 지급 규정, 어떻게 적용되나요? | 머니위키",
  description: "계약직에게도 퇴직금 지급 규정이 동일하게 적용돼요. 계약 갱신 시 기간 합산 여부, 리셋 방지, 지급 기한까지 한눈에 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약직-퇴직금-지급규정" },
  openGraph: {
    title: "계약직 퇴직금 지급 규정, 어떻게 적용되나요? | 머니위키",
    description: "계약직에게도 퇴직금 지급 규정이 동일하게 적용돼요. 계약 갱신 시 기간 합산 여부, 리셋 방지, 지급 기한까지 한눈에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약직-퇴직금-지급규정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
