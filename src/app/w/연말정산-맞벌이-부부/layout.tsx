import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 맞벌이 부부",
  description: "맞벌이 부부는 각자 연말정산하되, 자녀 공제나 의료비는 소득 높은 쪽에서 받는 게 유리해요. 전략적으로 배분하면 절세 효과가 커요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-맞벌이-부부" },
  openGraph: { title: "연말정산 맞벌이 부부", description: "맞벌이 부부는 각자 연말정산하되, 자녀 공제나 의료비는 소득 높은 쪽에서 받는 게 유리해요. 전략적으로 배분하면 절세 효과가 커요.", url: "https://www.jjyu.co.kr/w/연말정산-맞벌이-부부", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
