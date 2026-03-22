import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보증금 증감 청구, 특약으로 막을 수 있나요? 증감 청구권 특약의 효력 | 머니위키",
  description: "보증금 증액 제한 특약은 유효하지만, 감액 청구를 막는 특약은 무효예요. 임차인 보호 규정이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전월세-보증금증감청구-특약-효력" },
  openGraph: { title: "보증금 증감 청구, 특약으로 막을 수 있나요? 증감 청구권 특약의 효력 | 머니위키", description: "보증금 증액 제한 특약은 유효하지만, 감액 청구를 막는 특약은 무효예요. 임차인 보호 규정이에요.", url: "https://www.jjyu.co.kr/w/전월세-보증금증감청구-특약-효력", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
