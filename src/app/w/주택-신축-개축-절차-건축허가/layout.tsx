import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "집을 짓거나 고치려면 허가가 필요한가요? 건축허가 절차와 신고 기준 | 머니위키",
  description: "바닥면적 85㎡ 이하 소규모는 건축신고로 가능하고, 초과하면 건축허가가 필요해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-신축-개축-절차-건축허가" },
  openGraph: { title: "집을 짓거나 고치려면 허가가 필요한가요? 건축허가 절차와 신고 기준 | 머니위키", description: "바닥면적 85㎡ 이하 소규모는 건축신고로 가능하고, 초과하면 건축허가가 필요해요.", url: "https://www.jjyu.co.kr/w/주택-신축-개축-절차-건축허가", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
