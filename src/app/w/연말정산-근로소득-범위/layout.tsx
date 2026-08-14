import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "월급 말고 뭐가 근로소득이에요? 과세·비과세 항목 구분법",
  description: "급여·상여금·수당·현물급여까지 근로소득 범위와 비과세 항목(식대 월 20만원 등)을 소득세법 기준으로 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-근로소득-범위",
  },
  openGraph: {
    title: "연말정산 근로소득 범위와 비과세 항목",
    description: "과세 항목과 비과세 한도 한번에 정리.",
    url: "https://www.jjyu.co.kr/w/연말정산-근로소득-범위",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
