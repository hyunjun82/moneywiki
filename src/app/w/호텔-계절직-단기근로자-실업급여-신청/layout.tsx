import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "호텔 계절직 실업급여 받을 수 있을까? 자격과 신청 방법 | 머니위키",
  description: "호텔 계절직도 고용보험 180일 채우고 계약 만료되면 실업급여 대상이에요. 2026년 기준 1일 최대 68,100원, 신청 절차와 주의사항까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/호텔-계절직-단기근로자-실업급여-신청",
  },
  openGraph: {
    title: "호텔 계절직 실업급여 받을 수 있을까? 자격과 신청 방법",
    description: "계약 만료는 비자발적 퇴직이에요. 180일 가입 조건만 채우면 1일 최대 68,100원씩 받을 수 있어요.",
    url: "https://www.jjyu.co.kr/w/호텔-계절직-단기근로자-실업급여-신청",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
