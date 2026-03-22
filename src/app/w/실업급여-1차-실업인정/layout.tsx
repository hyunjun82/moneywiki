import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 1차 실업인정, 뭘 준비해야 하나요? 준비물과 진행 절차 | 머니위키",
  description: "1차 실업인정은 고용센터 방문 교육이에요. 구직활동 없이 출석만 하면 되고, 이후부터 구직활동 증빙이 필요해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-1차-실업인정" },
  openGraph: { title: "실업급여 1차 실업인정, 뭘 준비해야 하나요? 준비물과 진행 절차 | 머니위키", description: "1차 실업인정은 고용센터 방문 교육이에요. 구직활동 없이 출석만 하면 되고, 이후부터 구직활동 증빙이 필요해요.", url: "https://www.jjyu.co.kr/w/실업급여-1차-실업인정", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
