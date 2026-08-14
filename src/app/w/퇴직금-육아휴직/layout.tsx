import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 육아휴직, 휴직 기간도 근속에 포함될까?",
  description: "육아휴직 기간은 퇴직금 근속연수에 포함되지만 평균임금 산정에서는 제외돼요. 계산 방법과 불이익 방지법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-육아휴직" },
  openGraph: {
    title: "퇴직금 육아휴직, 휴직 기간도 근속에 포함될까? | 머니위키",
    description: "육아휴직 기간은 퇴직금 근속연수에 포함되지만 평균임금 산정에서는 제외돼요. 계산 방법과 불이익 방지법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-육아휴직",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
