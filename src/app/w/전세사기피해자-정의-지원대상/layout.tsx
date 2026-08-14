import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "전세사기피해자 인정 기준과 지원 내용 2026",
  description: "보증금을 못 돌려받았다면 전세사기피해자로 인정받을 수 있어요. 인정 조건 5가지와 지원 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세사기피해자-정의-지원대상" },
  openGraph: {
    title: "전세사기피해자 인정 기준과 지원 내용 2026 | 머니위키",
    description: "보증금을 못 돌려받았다면 전세사기피해자로 인정받을 수 있어요. 인정 조건 5가지와 지원 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/전세사기피해자-정의-지원대상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
