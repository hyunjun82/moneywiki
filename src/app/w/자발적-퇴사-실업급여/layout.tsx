import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자발적 퇴사도 실업급여 된다고? 정당한 사유 7가지",
  description: "자발적 퇴사도 임금체불, 직장 내 괴롭힘, 통근 곤란 등 정당한 사유가 있으면 실업급여를 받을 수 있어요. 인정 기준과 증빙자료를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/자발적-퇴사-실업급여" },
  openGraph: {
    title: "자발적 퇴사도 실업급여 된다고? 정당한 사유 7가지 | 머니위키",
    description: "자발적 퇴사도 임금체불, 직장 내 괴롭힘, 통근 곤란 등 정당한 사유가 있으면 실업급여를 받을 수 있어요. 인정 기준과 증빙자료를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/자발적-퇴사-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
