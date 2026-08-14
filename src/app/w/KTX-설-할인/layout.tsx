import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "KTX·SRT 설 할인 — 역귀성 열차 예매 방법과 할인 정보",
  description: "2026년 설 KTX·SRT 일부 열차 10~30% 할인. 역귀성(지방→서울) 할인폭이 더 크고, 2월 13~18일 6일간 적용돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/KTX-설-할인" },
  openGraph: {
    title: "KTX·SRT 설 할인 — 역귀성 열차 예매 방법과 할인 정보 | 머니위키",
    description: "2026년 설 KTX·SRT 일부 열차 10~30% 할인. 역귀성(지방→서울) 할인폭이 더 크고, 2월 13~18일 6일간 적용돼요.",
    url: "https://www.jjyu.co.kr/w/KTX-설-할인",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
