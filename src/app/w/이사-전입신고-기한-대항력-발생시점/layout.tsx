import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이사 전입신고 기한과 대항력 발생 시점 | 머니위키",
  description: "이사 후 전입신고 기한 14일, 대항력 발생 시점(다음 날 0시), 확정일자와 차이, 전입신고 방법을 정리했습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/이사-전입신고-기한-대항력-발생시점" },
  openGraph: {
    title: "이사 전입신고 기한과 대항력 발생 시점 | 머니위키",
    description: "이사 후 전입신고 기한 14일, 대항력 발생 시점, 확정일자와 차이, 전입신고 방법을 정리했습니다.",
    url: "https://www.jjyu.co.kr/w/이사-전입신고-기한-대항력-발생시점",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
