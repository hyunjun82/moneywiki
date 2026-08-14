import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 관리사무소장은 어떤 일을 하나요? 업무·자격·책임 정리",
  description: "관리사무소장은 시설 총괄, 직원 관리, 예산 집행까지 맡아요. 주택관리사 자격 요건과 선임·해임 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/아파트-관리사무소장-업무-역할" },
  openGraph: {
    title: "아파트 관리사무소장은 어떤 일을 하나요? 업무·자격·책임 정리 | 머니위키",
    description: "관리사무소장은 시설 총괄, 직원 관리, 예산 집행까지 맡아요. 주택관리사 자격 요건과 선임·해임 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/아파트-관리사무소장-업무-역할",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
