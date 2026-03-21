import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "토지 용도지역 건축제한 확인방법, 건폐율 용적률 | 머니위키",
  description: "토지 용도지역 분류, 건폐율·용적률 기준, 토지이음에서 확인하는 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/토지-용도지역-건축제한-확인방법" },
  openGraph: {
    title: "토지 용도지역 건축제한 확인방법 | 머니위키",
    description: "토지 용도지역 분류, 건폐율·용적률 기준, 토지이음에서 확인하는 방법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/토지-용도지역-건축제한-확인방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
