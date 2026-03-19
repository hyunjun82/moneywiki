import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "농지 상속 임대 가능 조건 비농업인 보유 방법 | 머니위키",
  description: "상속농지 1만㎡까지 비농업인 보유 가능. 초과분은 한국농어촌공사 위탁임대 필수. 직접임대·방치 시 처분명령.",
  openGraph: {
    title: "농지 상속 임대 가능 조건 비농업인 보유 방법",
    description: "상속농지 1만㎡ 초과 시 농지은행 위탁임대로 합법 운용.",
    url: "https://jjyu.co.kr/w/농지-상속-임대-가능-조건",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/농지-상속-임대-가능-조건",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
