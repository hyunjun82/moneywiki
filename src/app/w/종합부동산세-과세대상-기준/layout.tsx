import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종합부동산세 과세대상 기준 세율 | 머니위키",
  description: "종합부동산세 과세대상은 누구인지, 기준과 세율을 쉽게 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/종합부동산세-과세대상-기준" },
  openGraph: {
    title: "종합부동산세 과세대상 기준 세율",
    description: "종합부동산세 과세대상은 누구인지, 기준과 세율을 쉽게 알려드려요.",
    url: "https://www.jjyu.co.kr/w/종합부동산세-과세대상-기준",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
