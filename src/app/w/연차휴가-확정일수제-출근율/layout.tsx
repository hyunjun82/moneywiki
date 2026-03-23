import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연차휴가 확정일수제 출근율 | 머니위키",
  description: "확정일수제로 연차휴가를 부여하면 출근율 계산은 어떻게 하나요? 확정일수제와 출근율의 관계를 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연차휴가-확정일수제-출근율" },
  openGraph: { title: "연차휴가 확정일수제 출근율 | 머니위키", description: "확정일수제로 연차휴가를 부여하면 출근율 계산은 어떻게 하나요? 확정일수제와 출근율의 관계를 알려드릴게요.", url: "https://www.jjyu.co.kr/w/연차휴가-확정일수제-출근율", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
