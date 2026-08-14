import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "수습기간 해고 조건, 부당해고 기준과 구제신청 방법",
  description: "수습기간에도 정당한 사유 없이 해고하면 부당해고예요. 3개월 기준, 해고예고수당, 보상금 최대 1년분 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/수습기간-해고-조건" },
  openGraph: {
    title: "수습기간 해고 조건, 부당해고 기준과 구제신청 방법 | 머니위키",
    description: "수습기간에도 정당한 사유 없이 해고하면 부당해고예요. 3개월 기준, 해고예고수당, 보상금 최대 1년분 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/수습기간-해고-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
