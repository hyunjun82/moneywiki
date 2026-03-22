import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "요양보호사 표준교육과정 기한: 교육 시간 및 이수 방법 | 머니위키",
  description: "요양보호사 자격증 교육 시간이 320시간으로 늘어난 거 아시나요? 일반인부터 국가자격자까지 교육 기한과 이수 방법을 명확하게 알려드려요",
  openGraph: { title: "요양보호사 표준교육과정 기한: 교육 시간 및 이수 방법", description: "요양보호사 자격증 교육 시간이 320시간으로 늘어난 거 아시나요? 일반인부터 국가자격자까지 교육 기한과 이수 방법을 명확하게 알려드려요", url: "https://jjyu.co.kr/w/요양보호사-표준교육과정-기한" },
  alternates: { canonical: "https://jjyu.co.kr/w/요양보호사-표준교육과정-기한" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
