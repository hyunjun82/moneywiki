import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직연금 세액공제 한도 및 환급 방법 | 머니위키",
  description: "IRP 추가 납입하면 연 최대 900만원까지 16.5% 세액공제 받아요. 연말정산에서 최대 148만원 환급받을 수 있어요.",
  openGraph: { title: "퇴직연금 세액공제 한도 및 환급 방법", description: "IRP 추가 납입하면 연 최대 900만원까지 16.5% 세액공제 받아요. 연말정산에서 최대 148만원 환급받을 수 있어요.", url: "https://jjyu.co.kr/w/퇴직연금-세액공제" },
  alternates: { canonical: "https://jjyu.co.kr/w/퇴직연금-세액공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
