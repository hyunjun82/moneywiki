import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "배달기사, 어떤 보험에 들어야 하나요? 의무 가입 정리",
  description: "유상운송보험, 산재보험(의무), 개인 상해보험까지. 배달 플랫폼 기사에게 필요한 보험 종류와 비용 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/배달기사-보험-가입-종류" },
  openGraph: { title: "배달기사 필수 보험 3가지", description: "유상운송 + 산재 + 상해보험. 비용과 가입 방법.", url: "https://www.jjyu.co.kr/w/배달기사-보험-가입-종류", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
