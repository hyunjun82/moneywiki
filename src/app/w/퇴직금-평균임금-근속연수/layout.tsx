import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 평균임금과 근속연수 계산법 | 육아휴직·계약 변경 포함 | 머니위키",
  description: "퇴직금은 평균임금과 근속연수를 곱해 계산해요. 육아휴직, 병가, 계약 변경 시 근속연수 처리 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-평균임금-근속연수" },
  openGraph: {
    title: "퇴직금 평균임금과 근속연수 계산법 | 육아휴직·계약 변경 포함 | 머니위키",
    description: "퇴직금은 평균임금과 근속연수를 곱해 계산해요. 육아휴직, 병가, 계약 변경 시 근속연수 처리 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-평균임금-근속연수",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
