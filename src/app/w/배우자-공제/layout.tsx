import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 배우자 공제, 받을 수 있을까? 소득 기준과 맞벌이 절세법",
  description: "배우자 소득금액 100만원 이하(총급여 500만원 이하)면 기본공제 150만원을 받아요. 맞벌이 절세 전략과 소득 종류별 계산법까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배우자-공제" },
  openGraph: {
    title: "연말정산 배우자 공제, 받을 수 있을까? 소득 기준과 맞벌이 절세법 | 머니위키",
    description: "배우자 소득금액 100만원 이하(총급여 500만원 이하)면 기본공제 150만원을 받아요. 맞벌이 절세 전략과 소득 종류별 계산법까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/배우자-공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
