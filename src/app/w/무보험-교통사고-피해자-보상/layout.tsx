import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "무보험 교통사고 피해자 보상, 정부 보장사업 청구 방법",
  description: "무보험 차에 당하면 정부 보장사업으로 사망 1.5억, 부상 3천만원까지 보상. 손해보험사에서 청구하는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무보험-교통사고-피해자-보상" },
  openGraph: { title: "무보험 교통사고 피해자 보상, 정부 보장사업 청구 방법 | 머니위키", description: "무보험 차에 당하면 정부 보장사업으로 사망 1.5억, 부상 3천만원까지 보상.", url: "https://www.jjyu.co.kr/w/무보험-교통사고-피해자-보상", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
