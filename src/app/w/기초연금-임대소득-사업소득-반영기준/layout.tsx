import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "월세·이자 소득 있으면 기초연금? 임대소득·사업소득 반영 기준",
  description: "임대소득, 이자소득, 사업소득이 있을 때 기초연금 소득인정액에 반영되는 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-임대소득-사업소득-반영기준" },
  openGraph: {
    title: "월세·이자 소득 있으면 기초연금? 임대소득·사업소득 반영 기준 | 머니위키",
    description: "임대소득, 이자소득, 사업소득이 있을 때 기초연금 소득인정액에 반영되는 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-임대소득-사업소득-반영기준",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
