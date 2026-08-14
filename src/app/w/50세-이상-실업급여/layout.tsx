import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "50세 이상 실업급여 수급기간 혜택 | 최대 270일 연장 조건",
  description: "50세 이상이면 실업급여를 최대 270일까지 받는다는 사실 알고 계셨나요? 수급기간 연장 조건과 혜택을 정리해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/50세-이상-실업급여" },
  openGraph: { title: "50세 이상 실업급여 수급기간 혜택 | 최대 270일 연장 조건 | 머니위키", description: "50세 이상이면 실업급여를 최대 270일까지 받는다는 사실 알고 계셨나요? 수급기간 연장 조건과 혜택을 정리해드려요.", url: "https://www.jjyu.co.kr/w/50세-이상-실업급여", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
