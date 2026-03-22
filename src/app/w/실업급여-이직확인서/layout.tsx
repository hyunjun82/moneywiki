import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 이직확인서: 처리 여부 확인 및 정정 신청 방법 | 머니위키",
  description: "실업급여 신청하려면 이직확인서가 필요해요. 이직확인서가 뭔지, 어떻게 확인하는지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-이직확인서" },
  openGraph: { title: "실업급여 이직확인서: 처리 여부 확인 및 정정 신청 방법", description: "실업급여 신청하려면 이직확인서가 필요해요. 이직확인서가 뭔지, 어떻게 확인하는지 알려드려요", url: "https://www.jjyu.co.kr/w/실업급여-이직확인서", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
