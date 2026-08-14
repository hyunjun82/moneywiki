import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상가 전대, 임대인 동의 없으면 안 되나요? 전대 요건과 위반 시 해지",
  description: "상가 전대(재임대)는 임대인 동의가 필수예요. 무단 전대 시 계약 해지 사유가 돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가-전대-임대인-동의-필수" },
  openGraph: { title: "상가 전대, 임대인 동의 없으면 안 되나요? 전대 요건과 위반 시 해지 | 머니위키", description: "상가 전대(재임대)는 임대인 동의가 필수예요. 무단 전대 시 계약 해지 사유가 돼요.", url: "https://www.jjyu.co.kr/w/상가-전대-임대인-동의-필수", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
