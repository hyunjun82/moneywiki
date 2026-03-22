import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "통상임금에 어떤 수당이 포함되나요? 계산 방법과 포함·제외 기준 | 머니위키",
  description: "정기적·일률적·고정적으로 지급되는 수당은 통상임금에 포함돼요. 계산 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/통상임금-계산-수당-포함-기준" },
  openGraph: { title: "통상임금에 어떤 수당이 포함되나요? 계산 방법과 포함·제외 기준 | 머니위키", description: "정기적·일률적·고정적으로 지급되는 수당은 통상임금에 포함돼요. 계산 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/통상임금-계산-수당-포함-기준", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
