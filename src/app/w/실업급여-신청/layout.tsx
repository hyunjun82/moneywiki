import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 신청 방법 — 고용24 온라인부터 고용센터까지",
  description: "퇴사 후 실업급여 신청은 고용24 온라인 교육 이수 후 관할 고용센터 방문으로 진행돼요. 2026년 기준 1일 하한액 66,048원, 신청 절차와 필요 서류까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/실업급여-신청",
  },
  openGraph: {
    title: "실업급여 신청 방법 — 고용24 온라인부터 고용센터까지",
    description: "퇴사 후 12개월 이내 신청 필수. 구직등록부터 수급자격 인정까지 4단계 절차와 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-신청",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
