import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연차휴가 보상 제한 사용촉진제도 적용 | 머니위키",
  description: "연차휴가 보상을 제한할 수 있나요? 연차휴가 사용촉진제도의 적용과 연차수당 지급 제한을 알려드릴게요.",
  openGraph: { title: "연차휴가 보상 제한 사용촉진제도 적용 | 머니위키", description: "연차휴가 보상을 제한할 수 있나요? 연차휴가 사용촉진제도의 적용과 연차수당 지급 제한을 알려드릴게요.", url: "https://www.jjyu.co.kr/w/연차휴가-보상-제한-사용촉진제도-적용", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연차휴가-보상-제한-사용촉진제도-적용" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
