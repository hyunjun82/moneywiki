import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "미환급금 조회 정부24, 국세·건강보험·통신 환급금 30초 찾기",
  description: "정부24에서 미환급금 7가지를 한 번에 조회하는 방법이에요. 국세 평균 15만원, 건강보험 8만원 등 5년 시효 전에 꼭 찾아가세요.",
  openGraph: {
    title: "미환급금 조회 정부24, 국세·건강보험·통신 환급금 30초 찾기 | 머니위키",
    description: "정부24에서 7가지 미환급금을 한 번에 조회하고 바로 신청하는 방법이에요. 5년 지나면 소멸되니 지금 바로 조회하세요.",
    url: "https://www.jjyu.co.kr/w/미환급금-조회-정부24-환급금-찾기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/미환급금-조회-정부24-환급금-찾기" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
