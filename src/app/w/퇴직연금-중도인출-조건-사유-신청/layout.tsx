import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직연금 중도인출 조건 사유, 신청 방법 안내",
  description: "주택 구입·요양 등 부득이한 사유 5가지에만 55세 전 중도인출이 가능해요. 앱에서 증빙 서류를 올리면 3~5일 내 입금돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-중도인출-조건-사유-신청" },
  openGraph: {
    title: "퇴직연금 중도인출 조건 사유, 신청 방법 안내 | 머니위키",
    description: "주택 구입·요양 등 부득이한 사유 5가지에만 55세 전 중도인출이 가능해요. 앱에서 증빙 서류를 올리면 3~5일 내 입금돼요.",
    url: "https://www.jjyu.co.kr/w/퇴직연금-중도인출-조건-사유-신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
