import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보험설계사 실적 부족 해고 정당성",
  description: "보험 계약 실적이 안 나온다고 해고당했어요. 이게 정당한 해고인지 궁금하시죠?",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험설계사-실적-부족-해고-정당성" },
  openGraph: { title: "보험설계사 실적 부족 해고 정당성 | 머니위키", description: "보험 계약 실적이 안 나온다고 해고당했어요. 이게 정당한 해고인지 궁금하시죠?", url: "https://www.jjyu.co.kr/w/보험설계사-실적-부족-해고-정당성", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
