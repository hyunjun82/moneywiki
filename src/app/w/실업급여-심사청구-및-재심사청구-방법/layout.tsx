import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 심사청구·재심사청구, 거부당하면 어떻게? 90일 기한 | 머니위키",
  description: "실업급여 수급자격이 거부됐다면 90일 이내에 심사청구로 이의신청할 수 있어요. 심사청구와 재심사청구 절차, 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-심사청구-및-재심사청구-방법" },
  openGraph: {
    title: "실업급여 심사청구·재심사청구, 거부당하면 어떻게? 90일 기한 | 머니위키",
    description: "실업급여 수급자격이 거부됐다면 90일 이내에 심사청구로 이의신청할 수 있어요. 심사청구와 재심사청구 절차, 필요 서류를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-심사청구-및-재심사청구-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
