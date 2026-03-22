import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여도 압류당할 수 있나요? 압류 금지 범위와 예외 | 머니위키",
  description: "실업급여는 원칙적으로 압류 금지예요. 150만원 이하 전액 보호, 초과분도 일부 보호돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-압류" },
  openGraph: { title: "실업급여도 압류당할 수 있나요? 압류 금지 범위와 예외 | 머니위키", description: "실업급여는 원칙적으로 압류 금지예요. 150만원 이하 전액 보호, 초과분도 일부 보호돼요.", url: "https://www.jjyu.co.kr/w/실업급여-압류", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
