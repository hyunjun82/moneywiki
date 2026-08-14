import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 CCTV 의무 설치 기준과 화소·보관 규정",
  description: "300세대 이상 또는 150세대+승강기 아파트는 CCTV 의무 설치 대상이에요. 130만 화소, 30일 보관, 위반 시 500만원 과태료 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-CCTV-설치-의무-기준" },
  openGraph: {
    title: "아파트 CCTV 의무 설치 기준과 화소·보관 규정 | 머니위키",
    description: "300세대 이상 또는 150세대+승강기 아파트는 CCTV 의무 설치 대상이에요. 130만 화소, 30일 보관, 위반 시 500만원 과태료 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/아파트-CCTV-설치-의무-기준",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
