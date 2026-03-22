import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "지역사랑상품권 구매한도 보유한도 | 머니위키",
  description: "지역사랑상품권 살 때 한도가 있는지, 얼마까지 가지고 있을 수 있는지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지역사랑상품권-구매한도-보유한도" },
  openGraph: { title: "지역사랑상품권 구매한도 보유한도 | 머니위키", description: "지역사랑상품권 살 때 한도가 있는지, 얼마까지 가지고 있을 수 있는지 알려드려요", url: "https://www.jjyu.co.kr/w/지역사랑상품권-구매한도-보유한도", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
