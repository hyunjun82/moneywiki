import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 이의신청, 어떻게 해? 90일 기한과 증거 준비 방법",
  description: "실업급여 수급자격 불인정 처분에 이의가 있으면 90일 이내에 심사청구할 수 있죠. 심사청구서 작성법, 증거 준비, 재심사청구까지 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-이의신청" },
  openGraph: {
    title: "실업급여 이의신청, 어떻게 해? 90일 기한과 증거 준비 방법 | 머니위키",
    description: "실업급여 수급자격 불인정 처분에 이의가 있으면 90일 이내에 심사청구할 수 있죠. 심사청구서 작성법, 증거 준비, 재심사청구까지 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-이의신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
