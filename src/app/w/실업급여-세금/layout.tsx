import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 건강보험 지역가입자 | 수급 임의 보험료 부담",
  description: "실업급여를 받으면 건강보험이 지역가입자로 전환된다는 사실, 알고 계셨나요? 지역가입자 전환 시점부터 보험료 부담 감면까지 정리해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-세금" },
  openGraph: { title: "실업급여 건강보험 지역가입자 | 수급 임의 보험료 부담", description: "실업급여를 받으면 건강보험이 지역가입자로 전환된다는 사실, 알고 계셨나요? 지역가입자 전환 시점부터 보험료 부담 감면까지 정리해드려요.", url: "https://www.jjyu.co.kr/w/실업급여-세금", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
