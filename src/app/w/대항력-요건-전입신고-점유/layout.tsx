import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대항력 요건, 전입신고만으로 충분할까? 점유 조건과 발생 시점",
  description: "대항력은 점유+전입신고 두 가지를 갖춰야 생겨요. 발생 시점(다음 날 0시), 우선변제권 차이, 대항력 유지 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대항력-요건-전입신고-점유" },
  openGraph: {
    title: "대항력 요건, 전입신고만으로 충분할까? 점유 조건과 발생 시점 | 머니위키",
    description: "대항력은 점유+전입신고 두 가지를 갖춰야 생겨요. 발생 시점(다음 날 0시), 우선변제권 차이, 대항력 유지 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/대항력-요건-전입신고-점유",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
