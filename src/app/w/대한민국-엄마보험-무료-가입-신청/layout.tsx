import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "대한민국 엄마보험 무료 가입·신청·보장내용",
  description: "임신부 보험료 0원이에요. 국가가 전액 부담하는 대한민국 엄마보험으로 임신중독증, 희귀질환 보장받는 방법 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대한민국-엄마보험-무료-가입-신청" },
  openGraph: { title: "대한민국 엄마보험 무료 가입·신청·보장내용", description: "임신부 보험료 0원이에요. 국가가 전액 부담하는 대한민국 엄마보험으로 임신중독증, 희귀질환 보장받는 방법 알려드려요.", url: "https://www.jjyu.co.kr/w/대한민국-엄마보험-무료-가입-신청", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
