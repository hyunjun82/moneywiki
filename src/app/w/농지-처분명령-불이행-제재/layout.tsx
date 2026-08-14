import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농지 처분명령 불이행 시 이행강제금 계산과 대응법",
  description: "처분 기한 6개월 내 미매도 시 토지가액 20%가 매년 부과돼요. 이행강제금 계산과 한국농어촌공사 매입 등 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-처분명령-불이행-제재" },
  openGraph: {
    title: "농지 처분명령 불이행 시 이행강제금 계산과 대응법 | 머니위키",
    description: "처분 기한 6개월 내 미매도 시 토지가액 20%가 매년 부과돼요. 이행강제금 계산과 한국농어촌공사 매입 등 대응 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/농지-처분명령-불이행-제재",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
