import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경영상 이유 해고 요건: 긴박성·회피노력·선정·통보 | 머니위키",
  description: "경영상 해고는 긴박한 경영상 필요와 해고 회피 노력을 다했을 때만 정당하고 선정 기준과 절차를 위반하면 무효라는 거 아시나요? 정리해고 4가지 요건 알려드려요",
  openGraph: { title: "경영상 이유 해고 요건: 긴박성·회피노력·선정·통보", description: "경영상 해고는 긴박한 경영상 필요와 해고 회피 노력을 다했을 때만 정당하고 선정 기준과 절차를 위반하면 무효라는 거 아시나요? 정리해고 4가지 요건 알려드려요", url: "https://jjyu.co.kr/w/경영상-이유-해고-요건" },
  alternates: { canonical: "https://jjyu.co.kr/w/경영상-이유-해고-요건" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
