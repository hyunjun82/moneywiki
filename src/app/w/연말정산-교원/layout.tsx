import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "교원 연말정산 — 방과후수당·사학연금·비과세 항목 정리 | 머니위키",
  description: "교원도 일반 직장인처럼 연말정산해요. 방과후학교 수당 합산, 사학연금 소득공제, 교육비 공제 등 교원 특수 항목을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-교원" },
  openGraph: {
    title: "교원 연말정산 — 방과후수당·사학연금·비과세 항목 정리 | 머니위키",
    description: "교원도 일반 직장인처럼 연말정산해요. 방과후학교 수당 합산, 사학연금 소득공제, 교육비 공제 등 교원 특수 항목을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-교원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
