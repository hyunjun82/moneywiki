import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "선거 알바 4대보험 적용될까? 세금과 원천징수 처리",
  description: "선거 알바는 단기 용역이라 4대보험이 적용되지 않아요. 기타소득 8.8% 원천징수 후 나머지를 받죠. 실수령액 계산과 세금 처리를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/선거알바-4대보험-세금-원천징수" },
  openGraph: {
    title: "선거 알바 4대보험 적용될까? 세금과 원천징수 처리 | 머니위키",
    description: "선거 알바는 단기 용역이라 4대보험 미적용, 기타소득 8.8% 원천징수돼요.",
    url: "https://www.jjyu.co.kr/w/선거알바-4대보험-세금-원천징수",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
