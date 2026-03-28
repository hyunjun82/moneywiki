import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 배우자 가출·생사불명 | 3년 이상이면 이혼 청구 가능해요",
  description: "이혼 배우자 가출·생사불명 | 3년 이상이면 이혼 청구 가능해요 — 2026년 기준 조건·절차·서류를 정리했어요.",
  alternates: {
    canonical: "https://jjyu.co.kr/w/이혼-배우자-가출-생사불명",
  },
  openGraph: {
    title: "이혼 배우자 가출·생사불명 | 3년 이상이면 이혼 청구 가능해요",
    description: "이혼 배우자 가출·생사불명 | 3년 이상이면 이혼 청구 가능해요 — 2026년 기준 조건·절차·서류를 정리했어요.",
    url: "https://jjyu.co.kr/w/이혼-배우자-가출-생사불명",
    siteName: "머니위키",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
