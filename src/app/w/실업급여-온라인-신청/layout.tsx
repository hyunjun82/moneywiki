import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 온라인 신청 방법 고용24 | 비대면으로 처리되는 단계",
  description: "실업급여를 고용센터 방문 없이 온라인으로 신청하고 싶으신가요? 고용24에서 비대면으로 처리 가능한 단계와 방문이 필요한 단계를 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-온라인-신청" },
  openGraph: {
    title: "실업급여 온라인 신청 방법 고용24 | 비대면으로 처리되는 단계",
    description: "실업급여를 고용센터 방문 없이 온라인으로 신청하고 싶으신가요? 고용24에서 비대면으로 처리 가능한 단계와 방문이 필요한 단계를 알려드려요.",
    url: "https://www.jjyu.co.kr/w/실업급여-온라인-신청",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
