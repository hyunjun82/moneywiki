import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 수급 거부 사유: 지급 제한 및 부정수급 제재 기준",
  description: "실업급여 신청했는데 거부당할까 걱정되시죠? 수급 거부되는 사유와 제재 조치를 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-거부" },
  openGraph: { title: "실업급여 수급 거부 사유: 지급 제한 및 부정수급 제재 기준", description: "실업급여 신청했는데 거부당할까 걱정되시죠? 수급 거부되는 사유와 제재 조치를 알려드려요.", url: "https://www.jjyu.co.kr/w/실업급여-거부", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
