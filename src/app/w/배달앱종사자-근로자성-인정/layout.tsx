import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "배달앱종사자 근로자성 판단 기준과 보호 방법 | 머니위키",
  description: "배달앱 기사가 근로자인지 사업자인지 판단하는 기준을 정리했어요. 종속성·자율성 기준, 대법원 판례, 플랫폼 노무제공자 제도까지 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배달앱종사자-근로자성-인정" },
  openGraph: {
    title: "배달앱종사자 근로자성 판단 기준과 보호 방법 | 머니위키",
    description: "배달앱 기사가 근로자인지 사업자인지 판단하는 기준을 정리했어요. 종속성·자율성 기준, 대법원 판례, 플랫폼 노무제공자 제도까지 알려드려요.",
    url: "https://www.jjyu.co.kr/w/배달앱종사자-근로자성-인정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
