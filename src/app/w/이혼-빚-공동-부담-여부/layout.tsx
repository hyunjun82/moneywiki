import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "이혼하면 상대방 빚도 나눠야 하나요? 공동 채무와 개인 채무 구분",
  description: "혼인 중 가정을 위해 진 빚은 공동 부담, 개인적 빚은 해당 개인이 부담해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-빚-공동-부담-여부" },
  openGraph: { title: "이혼하면 상대방 빚도 나눠야 하나요? 공동 채무와 개인 채무 구분 | 머니위키", description: "혼인 중 가정을 위해 진 빚은 공동 부담, 개인적 빚은 해당 개인이 부담해요.", url: "https://www.jjyu.co.kr/w/이혼-빚-공동-부담-여부", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
