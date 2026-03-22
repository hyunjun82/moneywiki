import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "폐업 점포철거비 600만원 지원 신청 방법 | 머니위키",
  description: "소상공인 폐업 시 점포 원상복구 비용 최대 600만원 지원. 희망리턴패키지로 소진공에서 신청. 폐업 전·후 모두 가능.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/점포철거비-600만원-지원금-신청방법" },
  openGraph: { title: "폐업 점포철거비 600만원 지원 신청 방법", description: "소상공인 폐업 시 철거비 최대 600만원 지원.", url: "https://www.jjyu.co.kr/w/점포철거비-600만원-지원금-신청방법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
