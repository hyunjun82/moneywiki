import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부당해고 당했다면? 노동위원회 구제신청 신청 절차와 필요 서류",
  description: "부당해고 당했다면? 노동위원회 구제신청 신청 절차와 필요 서류에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/노동위원회-구제신청-방법" },
  openGraph: { title: "부당해고 당했다면? 노동위원회 구제신청 신청 절차와 필요 서류", description: "부당해고 당했다면? 노동위원회 구제신청 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/노동위원회-구제신청-방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
