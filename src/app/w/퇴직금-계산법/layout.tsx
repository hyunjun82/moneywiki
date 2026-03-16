import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 계산법, 월급쟁이가 알아야 할 핵심 공식 | 머니위키",
  description: "퇴직금 계산법 핵심은 1일 평균임금 x 30일 x 근속연수예요. 성과급·상여금 포함 여부, 육아휴직 기간 포함 기준까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-계산법" },
  openGraph: {
    title: "퇴직금 계산법, 월급쟁이가 알아야 할 핵심 공식 | 머니위키",
    description: "퇴직금 계산법 핵심은 1일 평균임금 x 30일 x 근속연수예요. 성과급·상여금 포함 여부, 육아휴직 기간 포함 기준까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-계산법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
