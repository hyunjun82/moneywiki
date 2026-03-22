import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "공정선거지원단 신청 조건과 활동 내용 | 머니위키",
  description: "공정선거지원단은 불법 선거운동을 감시하는 시민 참여 활동이에요. 신청 조건과 활동 내용, 활동비 지급 방식을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/공정선거지원단-신청조건-활동내용" },
  openGraph: {
    title: "공정선거지원단 신청 조건과 활동 내용 | 머니위키",
    description: "공정선거지원단은 불법 선거운동을 감시하는 시민 참여 활동이에요. 신청 조건과 활동 내용을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/공정선거지원단-신청조건-활동내용",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
