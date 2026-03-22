import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "증축 대수선 허가 신청 서류 | 머니위키",
  description: "집을 증축하거나 대수선할 때 어떤 서류를 준비해야 하는지 건축법 기준으로 정확히 알려드릴게요.",
  openGraph: { title: "증축 대수선 허가 신청 서류", description: "집을 증축하거나 대수선할 때 어떤 서류를 준비해야 하는지 건축법 기준으로 정확히 알려드릴게요.", url: "https://jjyu.co.kr/w/증축-대수선-허가-신청-서류" },
  alternates: { canonical: "https://jjyu.co.kr/w/증축-대수선-허가-신청-서류" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
