import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업인정 아르바이트 미신고, 걸리면? 부정수급 제재와 자진신고 방법",
  description: "실업급여 받으면서 아르바이트 미신고 시 전액 환수 + 최대 5배 추가징수, 3년 이하 징역 또는 3천만원 벌금까지 부과돼요. 자진신고 절차를 알려드려요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/실업인정-아르바이트-미신고-제재",
  },
  openGraph: {
    title: "실업인정 아르바이트 미신고, 걸리면? 부정수급 제재와 자진신고 방법",
    description: "미신고 시 전액 환수 + 5배 추가징수. 자진신고로 형사처벌 면제 가능.",
    url: "https://www.jjyu.co.kr/w/실업인정-아르바이트-미신고-제재",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
