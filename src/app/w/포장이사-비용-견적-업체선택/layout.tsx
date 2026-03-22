import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "포장이사 비용 견적 및 업체 선택 방법 | 머니위키",
  description: "포장이사 비용 얼마나 드는지, 견적 비교하는 방법 알려드려요. 업체 선택 시 주의할 점도 정리했어요.",
  openGraph: { title: "포장이사 비용 견적 및 업체 선택 방법 | 머니위키", description: "포장이사 비용 얼마나 드는지, 견적 비교하는 방법 알려드려요. 업체 선택 시 주의할 점도 정리했어요.", url: "https://www.jjyu.co.kr/w/포장이사-비용-견적-업체선택", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/포장이사-비용-견적-업체선택" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
