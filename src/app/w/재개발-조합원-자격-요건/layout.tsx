import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재개발 조합원 자격 요건 투기과열지구 제한",
  description: "재개발 구역에 있는 집 주인이면 다 조합원이 될 수 있는지, 자격 요건이 궁금하시죠?",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재개발-조합원-자격-요건" },
  openGraph: {
    title: "재개발 조합원 자격 요건 투기과열지구 제한",
    description: "재개발 구역에 있는 집 주인이면 다 조합원이 될 수 있는지, 자격 요건이 궁금하시죠?",
    url: "https://www.jjyu.co.kr/w/재개발-조합원-자격-요건",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
