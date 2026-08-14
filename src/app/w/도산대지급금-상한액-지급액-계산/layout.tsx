import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "도산대지급금, 얼마나 받을 수 있나요? 연령별 상한액과 지급액 계산",
  description: "도산대지급금은 연령에 따라 최대 2,100만원까지 지급돼요. 임금·퇴직금·휴업수당을 합산해서 상한 내에서 받을 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/도산대지급금-상한액-지급액-계산",
  },
  openGraph: {
    title: "도산대지급금 연령별 상한액과 계산 방법",
    description: "최대 2,100만원, 간이대지급금 700만원과의 차이까지 정리.",
    url: "https://www.jjyu.co.kr/w/도산대지급금-상한액-지급액-계산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
