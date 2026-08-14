import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 이사비, 비과세 받으려면? 실비변상 조건과 증빙",
  description: "회사 전근으로 받은 이사비는 실비변상이면 비과세예요. 정액 지급이나 한도 초과분은 과세 대상이에요. 비과세 조건과 증빙 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-이사비" },
  openGraph: {
    title: "연말정산 이사비, 비과세 받으려면? 실비변상 조건과 증빙 | 머니위키",
    description: "회사 전근으로 받은 이사비는 실비변상이면 비과세예요. 정액 지급이나 한도 초과분은 과세 대상이에요. 비과세 조건과 증빙 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-이사비",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
