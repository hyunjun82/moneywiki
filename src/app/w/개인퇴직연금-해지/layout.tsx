import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "개인퇴직연금 해지하면 세금 얼마? 해지 시 과세와 절차",
  description: "개인퇴직연금 해지하면 세금 얼마? 해지 시 과세와 절차에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인퇴직연금-해지" },
  openGraph: { title: "개인퇴직연금 해지하면 세금 얼마? 해지 시 과세와 절차", description: "개인퇴직연금 해지하면 세금 얼마? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/개인퇴직연금-해지", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
