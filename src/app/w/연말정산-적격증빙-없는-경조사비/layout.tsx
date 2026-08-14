import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경조사비 영수증 없는데 비과세 될까? 적격증빙 기준과 처리 방법",
  description: "적격증빙 없는 경조사비도 회사 내규와 사회통념상 범위 내라면 비과세예요. 결혼 축의금, 조의금 비과세 판단 기준과 대체 증빙 서류, 과세 시 처리 방법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-적격증빙-없는-경조사비",
  },
  openGraph: {
    title: "경조사비 영수증 없는데 비과세 될까? 적격증빙 기준과 처리 방법",
    description: "회사 내규 + 사회통념상 범위 + 대체 증빙이면 비과세 처리 가능해요.",
    url: "https://www.jjyu.co.kr/w/연말정산-적격증빙-없는-경조사비",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
