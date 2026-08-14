import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "개인 인공임신중절 유산사산휴가 — 기간별 휴가일수와 신청 방법",
  description: "개인 사유 인공임신중절도 유산사산휴가 대상이에요. 임신 기간별 5~90일 유급 휴가, 진단서 준비와 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인-인공임신중절-유산사산휴가" },
  openGraph: {
    title: "개인 인공임신중절 유산사산휴가 — 기간별 휴가일수와 신청 방법 | 머니위키",
    description: "개인 사유 인공임신중절도 유산사산휴가 대상이에요. 임신 기간별 5~90일 유급 휴가, 진단서 준비와 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/개인-인공임신중절-유산사산휴가",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
