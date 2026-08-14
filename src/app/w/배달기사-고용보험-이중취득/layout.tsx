import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "배달기사 고용보험 이중취득: 중복 가입 금지 규정 및 처벌",
  description: "배달기사도 고용보험 이중취득이 가능해요. 플랫폼 노무제공자는 일반 직장과 동시 가입할 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배달기사-고용보험-이중취득" },
  openGraph: { title: "배달기사 고용보험 이중취득: 중복 가입 금지 규정 및 처벌 | 머니위키", description: "배달기사도 고용보험 이중취득이 가능해요. 플랫폼 노무제공자는 일반 직장과 동시 가입할 수 있어요", url: "https://www.jjyu.co.kr/w/배달기사-고용보험-이중취득", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
