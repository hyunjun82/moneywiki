import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 산후조리원 공제, 200만원 한도 15% 환급 | 머니위키",
  description: "산후조리원 비용은 출산 1회당 200만원 한도로 15% 세액공제돼요. 소득 제한 없이 누구나 공제 가능하며, 모자보건법 등록 시설만 대상이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-산후조리원-공제",
  },
  openGraph: {
    title: "연말정산 산후조리원 공제, 200만원 한도 15% 환급",
    description: "산후조리원 200만원 한도, 15% 공제율, 소득 제한 없음. 공제 조건과 신청 방법 정리.",
    url: "https://www.jjyu.co.kr/w/연말정산-산후조리원-공제",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
