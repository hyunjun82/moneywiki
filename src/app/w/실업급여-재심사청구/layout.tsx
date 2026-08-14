import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 기각됐다면? 재심사청구 절차와 90일 기한",
  description: "실업급여 심사청구가 기각됐다면 90일 이내에 재심사청구를 할 수 있어요. 고용보험심사위원회 제출 방법과 행정소송까지의 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-재심사청구" },
  openGraph: {
    title: "실업급여 기각됐다면? 재심사청구 절차와 90일 기한 | 머니위키",
    description: "실업급여 심사청구가 기각됐다면 90일 이내에 재심사청구를 할 수 있어요. 고용보험심사위원회 제출 방법과 행정소송까지의 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-재심사청구",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
