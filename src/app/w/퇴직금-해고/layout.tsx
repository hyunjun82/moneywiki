import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "해고 시 퇴직금, 바로 받을 수 있나요? | 머니위키",
  description: "해고되어도 1년 이상 근무했다면 퇴직금을 받을 수 있어요. 즉시 해고 시 추가 보상과 지급 기한을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-해고" },
  openGraph: {
    title: "해고 시 퇴직금, 바로 받을 수 있나요? | 머니위키",
    description: "해고되어도 1년 이상 근무했다면 퇴직금을 받을 수 있어요. 즉시 해고 시 추가 보상과 지급 기한을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-해고",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
