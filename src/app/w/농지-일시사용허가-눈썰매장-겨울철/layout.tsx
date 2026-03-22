import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "농지 일시사용허가 눈썰매장 겨울철 운영 | 머니위키",
  description: "겨울에는 농사를 못 짓는데 농지를 눈썰매장으로 활용하고 싶으신가요? 허가 절차와 조건을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-일시사용허가-눈썰매장-겨울철" },
  openGraph: { title: "농지 일시사용허가 눈썰매장 겨울철 운영 | 머니위키", description: "겨울에는 농사를 못 짓는데 농지를 눈썰매장으로 활용하고 싶으신가요? 허가 절차와 조건을 알려드려요.", url: "https://www.jjyu.co.kr/w/농지-일시사용허가-눈썰매장-겨울철", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
