import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농지 대리경작 기간과 비용, 계약 조건 정리 | 머니위키",
  description: "대리경작 기간은 자유 계약, 경작료는 논 수확량 20~30%, 밭 연 50만~200만원 수준이에요. 임대차와의 차이와 계약 주의사항을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-대리경작-기간-비용" },
  openGraph: {
    title: "농지 대리경작 기간과 비용, 계약 조건 정리 | 머니위키",
    description: "대리경작 기간은 자유 계약, 경작료는 논 수확량 20~30%, 밭 연 50만~200만원 수준이에요. 임대차와의 차이와 계약 주의사항을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/농지-대리경작-기간-비용",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
