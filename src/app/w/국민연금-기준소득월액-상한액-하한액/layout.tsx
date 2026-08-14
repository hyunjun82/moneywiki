import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민연금 기준소득월액이 뭔가요? 상한액·하한액과 보험료 계산법",
  description: "기준소득월액은 국민연금 보험료와 연금 수령액을 결정하는 기준이에요. 2026년 1~6월 상한액 637만원, 하한액 40만원이고, 7월에 조정 예정이에요. 보험료율 9% 계산법까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/국민연금-기준소득월액-상한액-하한액",
  },
  openGraph: {
    title: "국민연금 기준소득월액이 뭔가요? 상한액·하한액과 보험료 계산법",
    description: "상한액 637만원, 하한액 40만원. 보험료 = 기준소득월액 × 9%.",
    url: "https://www.jjyu.co.kr/w/국민연금-기준소득월액-상한액-하한액",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
