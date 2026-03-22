import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 공제항목 — 소득공제·세액공제 종류와 한도 | 머니위키",
  description: "연말정산 공제항목은 소득공제와 세액공제로 나뉘어요. 인적공제, 신용카드, 의료비, 교육비, 연금저축 등 항목별 공제율과 한도를 비교했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-공제항목",
  },
  openGraph: {
    title: "연말정산 공제항목 — 소득공제·세액공제 종류와 한도",
    description: "소득공제는 소득을 줄이고, 세액공제는 세금을 줄여요. 항목별 한도와 2025년 변경사항까지.",
    url: "https://www.jjyu.co.kr/w/연말정산-공제항목",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
