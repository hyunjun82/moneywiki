import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "자발적 퇴사해도 실업급여 받을까? 정당한 사유 7가지와 증빙서류",
  description: "임금체불 2개월, 직장 내 괴롭힘, 통근 왕복 3시간 이상이면 자발적 퇴사도 실업급여 수급 가능해요. 2026년 기준 정당한 사유 7가지와 사유별 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-자발적퇴사-정당사유" },
  openGraph: {
    title: "자발적 퇴사해도 실업급여 받을까? 정당한 사유 7가지와 증빙서류 | 머니위키",
    description: "임금체불 2개월, 직장 내 괴롭힘, 통근 왕복 3시간 이상이면 자발적 퇴사도 실업급여 수급 가능해요. 2026년 기준 정당한 사유 7가지와 사유별 필요 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-자발적퇴사-정당사유",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
