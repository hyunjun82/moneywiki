import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상품권 임금 지급 위법",
  description: "월급을 상품권으로 주겠다는 회사, 이거 불법이에요. 임금은 반드시 통화로 직접 전액 지급해야 해요. 위반 시 처벌 받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상품권-임금-지급-위법" },
  openGraph: {
    title: "상품권 임금 지급 위법",
    description: "월급을 상품권으로 주겠다는 회사, 이거 불법이에요. 임금은 반드시 통화로 직접 전액 지급해야 해요. 위반 시 처벌 받아요.",
    url: "https://www.jjyu.co.kr/w/상품권-임금-지급-위법",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
