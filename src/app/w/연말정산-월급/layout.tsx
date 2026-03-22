import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산과 월급 — 원천징수·환급·추가납부 구조 | 머니위키",
  description: "매월 월급에서 떼는 세금(원천징수)과 연말정산의 관계를 정리했어요. 환급금은 2월 월급에 합쳐지고, 추가납부는 차감돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-월급" },
  openGraph: {
    title: "연말정산과 월급 — 원천징수·환급·추가납부 구조 | 머니위키",
    description: "매월 월급에서 떼는 세금(원천징수)과 연말정산의 관계를 정리했어요. 환급금은 2월 월급에 합쳐지고, 추가납부는 차감돼요.",
    url: "https://www.jjyu.co.kr/w/연말정산-월급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
