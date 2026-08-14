import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "IRP 세액공제 한도 및 연말정산 환급 계산법",
  description: "IRP에 연간 900만원까지 납입하면 최대 148.5만원 세액공제받아요. 연금저축과 합산해서 공제받는 방법 알려드려요.",
  openGraph: { title: "IRP 세액공제 한도 및 연말정산 환급 계산법", description: "IRP에 연간 900만원까지 납입하면 최대 148.5만원 세액공제받아요. 연금저축과 합산해서 공제받는 방법 알려드려요.", url: "https://jjyu.co.kr/w/IRP-세액공제-한도-연말정산-절세" },
  alternates: { canonical: "https://jjyu.co.kr/w/IRP-세액공제-한도-연말정산-절세" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
