import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "선거사무보조원, 뭐 하고 얼마 받을까? 업무와 모집 시기",
  description: "선거사무보조원은 일당 6만원 이내로, 선거 전후 행정 보조 업무를 담당해요. 모집 시기와 업무 내용을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/선거사무보조원-급여-업무-모집시기" },
  openGraph: {
    title: "선거사무보조원, 뭐 하고 얼마 받을까? 업무와 모집 시기 | 머니위키",
    description: "선거사무보조원은 일당 6만원 이내로, 선거 전후 행정 보조 업무를 담당해요.",
    url: "https://www.jjyu.co.kr/w/선거사무보조원-급여-업무-모집시기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
