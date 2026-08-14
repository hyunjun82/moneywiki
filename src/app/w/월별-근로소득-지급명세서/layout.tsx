import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "간이지급명세서 제출 기한과 방법 — 20인 이하 사업장",
  description: "직원 20명 이하 사업장은 반기별로 간이지급명세서를 제출해야 해요. 홈택스 제출 방법과 0.125% 가산세 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/월별-근로소득-지급명세서" },
  openGraph: {
    title: "간이지급명세서 제출 기한과 방법 — 20인 이하 사업장 | 머니위키",
    description: "직원 20명 이하 사업장은 반기별로 간이지급명세서를 제출해야 해요. 홈택스 제출 방법과 0.125% 가산세 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/월별-근로소득-지급명세서",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
