import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전대차 계약 동의서 작성 요령 및 전차인 보호 범위 | 머니위키",
  description: "전대차를 하려면 건물주 동의서가 필수예요. 어떻게 작성하고 전차인은 어디까지 보호되는지 알려드릴게요",
  openGraph: { title: "전대차 계약 동의서 작성 요령 및 전차인 보호 범위 | 머니위키", description: "전대차를 하려면 건물주 동의서가 필수예요. 어떻게 작성하고 전차인은 어디까지 보호되는지 알려드릴게요", url: "https://www.jjyu.co.kr/w/전대차-계약-동의서-작성-전차인-보호", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/전대차-계약-동의서-작성-전차인-보호" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
