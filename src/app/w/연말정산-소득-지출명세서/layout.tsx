import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 소득 지출명세서",
  description: "소득·지출명세서는 홈택스 간소화서비스에서 조회할 수 있어요. 1월 15일부터 오픈되고 누락된 자료는 직접 영수증을 받아야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-소득-지출명세서" },
  openGraph: { title: "연말정산 소득 지출명세서 | 머니위키", description: "소득·지출명세서는 홈택스 간소화서비스에서 조회할 수 있어요. 1월 15일부터 오픈되고 누락된 자료는 직접 영수증을 받아야 해요.", url: "https://www.jjyu.co.kr/w/연말정산-소득-지출명세서", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
