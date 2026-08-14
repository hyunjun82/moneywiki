import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 실업인정 특례 사유와 신청 방법",
  description: "질병·경조사·천재지변으로 구직활동 못 하면 특례 신청으로 실업급여 정상 수령 가능해요. 증빙서류와 고용24 신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-실업인정-특례" },
  openGraph: {
    title: "실업급여 실업인정 특례 사유와 신청 방법 | 머니위키",
    description: "질병·경조사·천재지변으로 구직활동 못 하면 특례 신청으로 실업급여 정상 수령 가능해요. 증빙서류와 고용24 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-실업인정-특례",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
