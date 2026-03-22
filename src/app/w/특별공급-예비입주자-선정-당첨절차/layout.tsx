import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "특별공급 예비입주자, 당첨 가능성 있을까? 선정 기준부터 절차까지 | 머니위키",
  description: "예비입주자는 물량의 500% 이상 선정. 정당첨자 포기 시 순번대로 기회가 와요. 당첨 절차와 대비 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/특별공급-예비입주자-선정-당첨절차" },
  openGraph: {
    title: "특별공급 예비입주자, 당첨 가능성 있을까? 선정 기준부터 절차까지 | 머니위키",
    description: "예비입주자는 물량의 500% 이상 선정. 정당첨자 포기 시 순번대로 기회가 와요. 당첨 절차와 대비 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/특별공급-예비입주자-선정-당첨절차",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
