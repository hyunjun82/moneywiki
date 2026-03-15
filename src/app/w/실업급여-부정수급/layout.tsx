import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 부정수급 처벌 기준 | 최대 5배 환수와 형사처벌 | 머니위키",
  description: "실업급여 부정수급 시 받은 금액 전액 반환에 최대 5배 추가 징수, 형사처벌까지 받을 수 있어요. 자진신고하면 추가 징수를 면제받을 수 있죠.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-부정수급" },
  openGraph: {
    title: "실업급여 부정수급 처벌 기준 | 최대 5배 환수와 형사처벌 | 머니위키",
    description: "실업급여 부정수급 시 받은 금액 전액 반환에 최대 5배 추가 징수, 형사처벌까지 받을 수 있어요. 자진신고하면 추가 징수를 면제받을 수 있죠.",
    url: "https://www.jjyu.co.kr/w/실업급여-부정수급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
