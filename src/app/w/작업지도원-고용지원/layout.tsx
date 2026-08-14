import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인 작업지도원 배치하면 얼마 지원? 자격 요건과 신청 방법",
  description: "중증장애인 1명당 월 14만원, 최대 5명까지 지원받아요. 작업지도원 자격 요건과 e신고서비스 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/작업지도원-고용지원" },
  openGraph: {
    title: "장애인 작업지도원 배치하면 얼마 지원? 자격 요건과 신청 방법 | 머니위키",
    description: "중증장애인 1명당 월 14만원, 최대 5명까지 지원받아요. 작업지도원 자격 요건과 e신고서비스 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/작업지도원-고용지원",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
