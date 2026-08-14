import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "육아 중 실업급여 — 수급유예·구직면제 신청 방법",
  description: "임신·출산·육아로 구직활동 못 하면 수급유예를 신청해요. 최대 4년 연장 가능하고, 구직활동 면제와의 차이·신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-육아" },
  openGraph: {
    title: "육아 중 실업급여 — 수급유예·구직면제 신청 방법 | 머니위키",
    description: "임신·출산·육아로 구직활동 못 하면 수급유예를 신청해요. 최대 4년 연장 가능하고, 구직활동 면제와의 차이·신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-육아",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
