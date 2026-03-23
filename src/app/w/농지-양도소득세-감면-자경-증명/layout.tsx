import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농지 양도소득세 감면, 8년 자경 증명 방법과 요건 | 머니위키",
  description: "8년 이상 직접 경작한 농지를 팔면 양도소득세 100%를 감면받아요. 자경 증명 서류와 감면 한도를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/농지-양도소득세-감면-자경-증명" },
  openGraph: {
    title: "농지 양도소득세 감면, 8년 자경 증명 방법과 요건 | 머니위키",
    description: "8년 이상 직접 경작한 농지를 팔면 양도소득세 100%를 감면받아요. 자경 증명 서류와 감면 한도를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/농지-양도소득세-감면-자경-증명",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
