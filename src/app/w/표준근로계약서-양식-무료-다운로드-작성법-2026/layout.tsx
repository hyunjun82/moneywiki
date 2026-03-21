import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "표준근로계약서 양식 무료 다운로드 작성법 2026 | 머니위키",
  description: "정규직·계약직·알바 표준근로계약서 양식을 고용노동부에서 무료로 받고 2026 최저임금 10,320원 기준으로 작성하는 법이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/표준근로계약서-양식-무료-다운로드-작성법-2026" },
  openGraph: {
    title: "표준근로계약서 양식 무료 다운로드 작성법 2026 | 머니위키",
    description: "정규직·계약직·알바 표준근로계약서 양식을 고용노동부에서 무료로 받고 2026 최저임금 10,320원 기준으로 작성하는 법이에요.",
    url: "https://www.jjyu.co.kr/w/표준근로계약서-양식-무료-다운로드-작성법-2026",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
