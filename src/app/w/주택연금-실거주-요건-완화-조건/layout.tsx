import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택연금 실거주 요건 완화 조건 | 머니위키",
  description: "주택연금 받으려면 무조건 그 집에 살아야 한다고 생각하시나요? 2026년 6월부터는 질병치료나 요양원 입주 때도 가입할 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택연금-실거주-요건-완화-조건" },
  openGraph: {
    title: "주택연금 실거주 요건 완화 조건",
    description: "주택연금 받으려면 무조건 그 집에 살아야 한다고 생각하시나요? 2026년 6월부터는 질병치료나 요양원 입주 때도 가입할 수 있어요",
    url: "https://www.jjyu.co.kr/w/주택연금-실거주-요건-완화-조건",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
