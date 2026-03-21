import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "기타소득 원천징수 세율 8.8%와 실수령액 계산 | 머니위키",
  description: "기타소득 원천징수 세율 구조, 필요경비 60%, 실수령액 계산법, 분리과세와 종합과세 기준을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기타소득-원천징수-세율" },
  openGraph: {
    title: "기타소득 원천징수 세율 8.8%와 실수령액 계산 | 머니위키",
    description: "기타소득 원천징수 세율 구조, 필요경비 60%, 실수령액 계산법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/기타소득-원천징수-세율",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
