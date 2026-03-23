import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "가정폭력 이혼 방법: 절차 및 피해자 보호 규정 | 머니위키",
  description: "배우자가 폭력을 행사하는데 이혼하려면 어떻게 해야 할지 막막하시죠? 가정폭력 이혼 절차와 긴급 신고 방법, 위자료 청구까지 모두 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/가정폭력-이혼-방법" },
  openGraph: { title: "가정폭력 이혼 방법: 절차 및 피해자 보호 규정", description: "배우자가 폭력을 행사하는데 이혼하려면 어떻게 해야 할지 막막하시죠? 가정폭력 이혼 절차와 긴급 신고 방법, 위자료 청구까지 모두 알려드려요", url: "https://www.jjyu.co.kr/w/가정폭력-이혼-방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
