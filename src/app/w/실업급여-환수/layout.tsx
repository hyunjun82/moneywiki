import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 환수 통보받았다면? 반환 금액과 이의신청까지 | 머니위키",
  description: "실업급여 환수 통보를 받았다면 부정수급 금액 전액 반환과 최대 2배 제재금이 부과돼요. 분할 납부, 이의신청 방법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-환수" },
  openGraph: {
    title: "실업급여 환수 통보받았다면? 반환 금액과 이의신청까지 | 머니위키",
    description: "실업급여 환수 통보를 받았다면 부정수급 금액 전액 반환과 최대 2배 제재금이 부과돼요. 분할 납부, 이의신청 방법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-환수",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
