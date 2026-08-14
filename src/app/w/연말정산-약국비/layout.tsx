import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 약국비 공제 — 대상 항목과 한도",
  description: "약국에서 산 처방약·일반 의약품은 의료비 세액공제 대상이에요. 건강기능식품·영양제는 제외. 공제 기준과 한도를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-약국비" },
  openGraph: {
    title: "연말정산 약국비 공제 — 대상 항목과 한도",
    description: "의약품은 공제, 건강기능식품은 제외. 기준 정리.",
    url: "https://www.jjyu.co.kr/w/연말정산-약국비",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
