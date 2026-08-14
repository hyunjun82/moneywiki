import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "자손 자상 차이: 보장 범위와 보험료 비교",
  description: "자손과 자상의 보장 범위가 어떻게 다른지 알려드려요. 치료비 전액 보장이 필요하다면 자상, 보험료 절약하려면 자손을 선택하면 돼요",
  openGraph: { title: "자손 자상 차이: 보장 범위와 보험료 비교", description: "자손과 자상의 보장 범위가 어떻게 다른지 알려드려요. 치료비 전액 보장이 필요하다면 자상, 보험료 절약하려면 자손을 선택하면 돼요", url: "https://jjyu.co.kr/w/자동차보험-자손-자상-차이" },
  alternates: { canonical: "https://jjyu.co.kr/w/자동차보험-자손-자상-차이" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
