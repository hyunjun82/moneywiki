import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "건설일용직도 실업급여 받을 수 있나요? 수급 요건",
  description: "건설일용직도 18개월 중 180일 이상 근무하면 실업급여 가능. 공사 종료 = 비자발적 이직. 하한액 66,048원.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-건설일용직" },
  openGraph: { title: "건설일용직 실업급여", description: "18개월 중 180일 이상 → 수급자격. 공사 종료 = 비자발적 이직.", url: "https://www.jjyu.co.kr/w/실업급여-건설일용직", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
