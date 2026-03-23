import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "이혼하면 기초연금 새로 받을 수 있을까? 소득 합산 해제와 재신청 | 머니위키",
  description: "이혼하면 배우자 소득 합산이 해제돼서 기초연금 대상이 될 수 있어요. 단독가구 기준 적용과 재신청 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-이혼-소득합산해제-재신청" },
  openGraph: {
    title: "이혼하면 기초연금 새로 받을 수 있을까? 소득 합산 해제와 재신청 | 머니위키",
    description: "이혼하면 배우자 소득 합산이 해제돼서 기초연금 대상이 될 수 있어요. 단독가구 기준 적용과 재신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-이혼-소득합산해제-재신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
