import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 경로우대 공제 | 머니위키",
  description: "만 70세 이상 부모님 부양하면 1인당 최대 60만원 돌려받아요. 기본공제에 100만원 추가로 받아요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-경로우대-공제" },
  openGraph: {
    title: "연말정산 경로우대 공제",
    description: "만 70세 이상 부모님 부양하면 1인당 최대 60만원 돌려받아요. 기본공제에 100만원 추가로 받아요",
    url: "https://www.jjyu.co.kr/w/연말정산-경로우대-공제",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
