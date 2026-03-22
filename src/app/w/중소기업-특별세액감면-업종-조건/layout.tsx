import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "중소기업 특별세액감면 업종 조건 — 감면율과 신청 방법 | 머니위키",
  description: "중소기업 특별세액감면 대상 업종과 감면율을 정리했어요. 소기업 기준 제조업 비수도권 30%, 수도권 10%까지 법인세·소득세를 줄일 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/중소기업-특별세액감면-업종-조건" },
  openGraph: {
    title: "중소기업 특별세액감면 업종 조건 — 감면율과 신청 방법",
    description: "업종별 감면율, 대상 조건, 제외 업종까지 확인하세요.",
    url: "https://www.jjyu.co.kr/w/중소기업-특별세액감면-업종-조건",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
