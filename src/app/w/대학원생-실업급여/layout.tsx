import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대학원생 실업급여, 받을 수 있나요? RA·TA 수급 조건과 구직활동 방법",
  description: "RA·TA 계약이 끝난 대학원생도 실업급여를 받을 수 있어요. 야간·주말 대학원은 문제없고, 전일제는 구직활동 기록으로 입증하면 돼요. 수급 조건과 구직활동 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대학원생-실업급여" },
  openGraph: {
    title: "대학원생 실업급여, 받을 수 있나요? RA·TA 수급 조건과 구직활동 방법 | 머니위키",
    description: "RA·TA 계약이 끝난 대학원생도 실업급여를 받을 수 있어요. 야간·주말 대학원은 문제없고, 전일제는 구직활동 기록으로 입증하면 돼요.",
    url: "https://www.jjyu.co.kr/w/대학원생-실업급여",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
