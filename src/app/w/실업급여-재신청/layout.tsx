import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 재신청, 또 받을 수 있을까? 재수급 자격과 기간 | 머니위키",
  description: "실업급여를 받은 적 있어도 다시 받을 수 있어요. 재신청 조건, 가입기간 리셋, 수급기간 변화까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-재신청" },
  openGraph: {
    title: "실업급여 재신청, 또 받을 수 있을까? 재수급 자격과 기간 | 머니위키",
    description: "실업급여를 받은 적 있어도 다시 받을 수 있어요. 재신청 조건, 가입기간 리셋, 수급기간 변화까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/실업급여-재신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
