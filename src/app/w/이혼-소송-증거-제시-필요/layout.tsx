import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼 소송, 어떤 증거가 필요할까? 사유별 증거와 효력 기준",
  description: "부정행위·폭행·유기 등 이혼 사유별 필요 증거, 법원이 보는 효력 판단 기준, 전자소송 제출 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이혼-소송-증거-제시-필요" },
  openGraph: {
    title: "이혼 소송, 어떤 증거가 필요할까? 사유별 증거와 효력 기준 | 머니위키",
    description: "부정행위·폭행·유기 등 이혼 사유별 필요 증거, 법원이 보는 효력 판단 기준, 전자소송 제출 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/이혼-소송-증거-제시-필요",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
