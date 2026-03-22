import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "취득세 세율 | 머니위키",
  description: "부동산 취득세 세율과 계산 방법을 알아봅니다. 주택, 토지, 상가 등 부동산 유형별 취득세율을 정리합니다.",
  openGraph: { title: "취득세 세율 | 머니위키", description: "부동산 취득세 세율과 계산 방법을 알아봅니다. 주택, 토지, 상가 등 부동산 유형별 취득세율을 정리합니다.", url: "https://www.jjyu.co.kr/w/취득세-세율", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/취득세-세율" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
