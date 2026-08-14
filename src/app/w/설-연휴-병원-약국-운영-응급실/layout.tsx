import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "설 연휴 병원·약국 문 여는 곳, 응급실부터 휴일지킴이약국까지",
  description: "설 연휴에 문 여는 병원과 약국을 찾는 가장 빠른 방법이에요. 응급의료포털 검색법, 휴일지킴이약국, 야간 가산 30% 정보까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/설-연휴-병원-약국-운영-응급실" },
  openGraph: {
    title: "설 연휴 병원·약국 문 여는 곳, 응급실부터 휴일지킴이약국까지 | 머니위키",
    description: "설 연휴에 문 여는 병원과 약국을 찾는 가장 빠른 방법이에요. 응급의료포털 검색법, 휴일지킴이약국, 야간 가산 30% 정보까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/설-연휴-병원-약국-운영-응급실",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
