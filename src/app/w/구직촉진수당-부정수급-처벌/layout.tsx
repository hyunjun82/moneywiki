import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "구직촉진수당 부정수급·처벌·환수·제재 기준 | 머니위키",
  description: "취업 확정됐는데 동생 이름으로 구직촉진수당 받으면 사기죄예요. 부정수급은 형사처벌 + 2배 추징 + 수급자격 제한 받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/구직촉진수당-부정수급-처벌" },
  openGraph: { title: "구직촉진수당 부정수급·처벌·환수·제재 기준 | 머니위키", description: "취업 확정됐는데 동생 이름으로 구직촉진수당 받으면 사기죄예요. 부정수급은 형사처벌 + 2배 추징 + 수급자격 제한 받아요.", url: "https://www.jjyu.co.kr/w/구직촉진수당-부정수급-처벌", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
