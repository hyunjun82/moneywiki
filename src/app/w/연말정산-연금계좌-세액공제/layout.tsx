import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 연금계좌 세액공제 완벽 가이드 (2025년)",
  description: "연금계좌에 납입하면 최대 16.5% 세액공제를 받을 수 있어요. 연금저축과 IRP를 합쳐 연간 700만원까지 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-연금계좌-세액공제" },
  openGraph: { title: "연말정산 연금계좌 세액공제 완벽 가이드 (2025년) | 머니위키", description: "연금계좌에 납입하면 최대 16.5% 세액공제를 받을 수 있어요. 연금저축과 IRP를 합쳐 연간 700만원까지 가능해요.", url: "https://www.jjyu.co.kr/w/연말정산-연금계좌-세액공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
