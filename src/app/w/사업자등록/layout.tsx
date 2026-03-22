import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "사업자등록 방법 — 절차·서류·간이과세자 기준 | 머니위키",
  description: "사업자등록은 사업개시일로부터 20일 이내에 해야 해요. 홈택스 온라인 신청 절차, 필요 서류, 간이과세자 기준까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/사업자등록",
  },
  openGraph: {
    title: "사업자등록 방법 — 절차·서류·간이과세자 기준",
    description: "홈택스 온라인 신청 5단계, 간이과세자 vs 일반과세자 비교, 미등록 가산세까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/사업자등록",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
