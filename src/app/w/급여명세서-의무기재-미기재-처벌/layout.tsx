import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "급여명세서에 뭘 꼭 적어야 하나요? 의무 기재항목과 미기재 시 처벌 | 머니위키",
  description: "2021년부터 급여명세서 교부 의무화. 기본급·수당·공제 내역 미기재 시 500만원 이하 과태료예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/급여명세서-의무기재-미기재-처벌" },
  openGraph: { title: "급여명세서에 뭘 꼭 적어야 하나요? 의무 기재항목과 미기재 시 처벌 | 머니위키", description: "2021년부터 급여명세서 교부 의무화. 기본급·수당·공제 내역 미기재 시 500만원 이하 과태료예요.", url: "https://www.jjyu.co.kr/w/급여명세서-의무기재-미기재-처벌", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
