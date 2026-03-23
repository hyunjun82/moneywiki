import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 부정수급 반환, 추가징수 5배와 자진신고 면제 | 머니위키",
  description: "부정수급 적발 시 원금 반환 + 최대 5배 추가징수가 부과돼요. 자진신고하면 추가징수 면제 가능. 반환금 계산과 대응 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-반환" },
  openGraph: {
    title: "실업급여 부정수급 반환, 추가징수 5배와 자진신고 면제 | 머니위키",
    description: "부정수급 적발 시 원금 반환 + 최대 5배 추가징수가 부과돼요. 자진신고하면 추가징수 면제 가능. 반환금 계산과 대응 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-반환",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
