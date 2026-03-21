import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민연금 조기수령 감액률 — 신청조건·손익분기점 계산법 | 머니위키",
  description: "1년 앞당기면 6% 감액, 5년이면 30% 깎여요. 출생연도별 조기수령 가능 나이, 소득 조건 298만원, 손익분기점 77세 계산까지 정리해드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민연금-조기수령-감액률-신청조건-손익분기점" },
  openGraph: {
    title: "국민연금 조기수령 감액률 — 신청조건·손익분기점 계산법 | 머니위키",
    description: "1년 앞당기면 6% 감액, 5년이면 30% 깎여요. 출생연도별 조기수령 가능 나이, 소득 조건 298만원, 손익분기점 77세 계산까지 정리해드려요.",
    url: "https://www.jjyu.co.kr/w/국민연금-조기수령-감액률-신청조건-손익분기점",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
