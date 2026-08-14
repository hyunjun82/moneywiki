import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "다가구주택 경계벽 대수선 허가 건축법 2026",
  description: "다가구주택 가구 간 벽 뚫거나 수리하려고요. 신고만 하면 되나요? 증설·해체는 허가 필요해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/다가구주택-경계벽-대수선-허가-건축법" },
  openGraph: { title: "다가구주택 경계벽 대수선 허가 건축법 2026", description: "다가구주택 가구 간 벽 뚫거나 수리하려고요. 신고만 하면 되나요? 증설·해체는 허가 필요해요.", url: "https://www.jjyu.co.kr/w/다가구주택-경계벽-대수선-허가-건축법", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
