import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년주택드림청약 기존 주택청약종합저축 전환 가입 | 머니위키",
  description: "이미 주택청약종합저축이 있는데, 청년주택드림청약통장에 새로 가입해야 하는지 궁금하시죠. 전환 방법을 알아봐요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년주택드림청약-기존통장-전환" },
  openGraph: { title: "청년주택드림청약 기존 주택청약종합저축 전환 가입 | 머니위키", description: "이미 주택청약종합저축이 있는데, 청년주택드림청약통장에 새로 가입해야 하는지 궁금하시죠. 전환 방법을 알아봐요", url: "https://www.jjyu.co.kr/w/청년주택드림청약-기존통장-전환", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
