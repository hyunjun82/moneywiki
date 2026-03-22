import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보험 가입 전 확인사항 체크리스트, 후회 안 하는 10가지 | 머니위키",
  description: "보장내용, 면책기간, 해지환급금, 갱신형 vs 비갱신형, 고지의무까지 보험 가입 전 반드시 체크할 10가지를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보험-가입-전-확인사항" },
  openGraph: {
    title: "보험 가입 전 확인사항 체크리스트, 후회 안 하는 10가지 | 머니위키",
    description: "보장내용, 면책기간, 해지환급금, 갱신형 vs 비갱신형, 고지의무까지 보험 가입 전 반드시 체크할 10가지를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/보험-가입-전-확인사항",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
