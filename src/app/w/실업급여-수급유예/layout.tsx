import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산·질병으로 실업급여 못 받고 있다면, 수급유예로 최대 4년 연장",
  description: "고용보험법 제48조에 따라 질병, 출산, 육아, 배우자 동반출국 시 실업급여 수급기간을 최대 4년까지 연장할 수 있어요. 수급기간 내 신청이 핵심이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-수급유예" },
  openGraph: {
    title: "출산·질병으로 실업급여 못 받고 있다면, 수급유예로 최대 4년 연장 | 머니위키",
    description: "고용보험법 제48조에 따라 질병, 출산, 육아, 배우자 동반출국 시 실업급여 수급기간을 최대 4년까지 연장할 수 있어요. 수급기간 내 신청이 핵심이에요.",
    url: "https://www.jjyu.co.kr/w/실업급여-수급유예",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
