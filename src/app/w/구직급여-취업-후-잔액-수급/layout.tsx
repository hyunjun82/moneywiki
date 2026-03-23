import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "구직급여 취업 후 잔액 수급 조건 | 머니위키",
  description: "구직급여 받다가 취업하면 남은 수급일수의 50%를 조기재취업수당으로 받을 수 있어요. 조건과 신청 방법 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직급여-취업-후-잔액-수급" },
  openGraph: {
    title: "구직급여 취업 후 잔액 수급 조건",
    description: "조기재취업수당으로 남은 구직급여의 50%를 한 번에 받는 방법.",
    url: "https://www.jjyu.co.kr/w/구직급여-취업-후-잔액-수급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
