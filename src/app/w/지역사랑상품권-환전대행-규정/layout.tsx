import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "지역사랑상품권 환전대행 규정 | 머니위키",
  description: "환전대행가맹점인데 다른 가맹점에서 환전 요청이 왔다면 해도 되는지 헷갈리시죠?",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지역사랑상품권-환전대행-규정" },
  openGraph: { title: "지역사랑상품권 환전대행 규정", description: "환전대행가맹점인데 다른 가맹점에서 환전 요청이 왔다면 해도 되는지 헷갈리시죠?", url: "https://www.jjyu.co.kr/w/지역사랑상품권-환전대행-규정", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
