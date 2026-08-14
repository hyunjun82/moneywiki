import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "개인통관고유부호 발급·변경·조회 — 2026년 매년 갱신 필수",
  description: "2026년부터 개인통관고유부호 매년 갱신 필수예요. 관세청 유니패스에서 5분 발급, 변경, 조회하는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인통관고유부호-발급-변경-조회-방법" },
  openGraph: {
    title: "개인통관고유부호 발급·변경·조회 — 2026년 매년 갱신 필수 | 머니위키",
    description: "2026년부터 개인통관고유부호 매년 갱신 필수예요. 관세청 유니패스에서 5분 발급, 변경, 조회하는 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/개인통관고유부호-발급-변경-조회-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
