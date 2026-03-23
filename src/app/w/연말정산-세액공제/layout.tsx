import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 세액공제, 항목별 공제율과 절세 전략 | 머니위키",
  description: "세액공제는 세금을 직접 빼줘서 소득공제보다 강력해요. 의료비 15%, 연금저축 16.5%, 자녀 25만원 등 2025년 귀속 세액공제 항목을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-세액공제",
  },
  openGraph: {
    title: "연말정산 세액공제, 항목별 공제율과 절세 전략",
    description: "의료비 15%, 연금저축 16.5%, 자녀세액공제 25만원. 2025년 귀속 세액공제 항목 비교.",
    url: "https://www.jjyu.co.kr/w/연말정산-세액공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
