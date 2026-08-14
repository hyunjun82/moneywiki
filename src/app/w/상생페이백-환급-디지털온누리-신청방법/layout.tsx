import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상생페이백 환급, 어떻게 받나요? 디지털온누리 신청과 환급 방법",
  description: "전통시장·온누리상품권 사용 시 10% 캐시백. 디지털온누리 앱에서 신청하고 사용하면 자동 환급돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상생페이백-환급-디지털온누리-신청방법" },
  openGraph: { title: "상생페이백 환급, 어떻게 받나요? 디지털온누리 신청과 환급 방법 | 머니위키", description: "전통시장·온누리상품권 사용 시 10% 캐시백. 디지털온누리 앱에서 신청하고 사용하면 자동 환급돼요.", url: "https://www.jjyu.co.kr/w/상생페이백-환급-디지털온누리-신청방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
