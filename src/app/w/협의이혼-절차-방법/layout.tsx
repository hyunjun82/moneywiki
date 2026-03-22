import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "협의이혼 절차 — 가정법원 신청부터 신고까지 4단계 | 머니위키",
  description: "협의이혼은 가정법원 신청, 숙려기간, 의사확인, 이혼신고 4단계로 진행돼요. 자녀 있으면 3개월, 없으면 1개월 걸려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/협의이혼-절차-방법" },
  openGraph: {
    title: "협의이혼 절차 — 가정법원 신청부터 신고까지 4단계 | 머니위키",
    description: "협의이혼은 가정법원 신청, 숙려기간, 의사확인, 이혼신고 4단계로 진행돼요. 자녀 있으면 3개월, 없으면 1개월 걸려요.",
    url: "https://www.jjyu.co.kr/w/협의이혼-절차-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
