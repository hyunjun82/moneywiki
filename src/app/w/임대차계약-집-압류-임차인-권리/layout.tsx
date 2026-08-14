import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "임대차계약 집 압류 임차인 권리 보호",
  description: "살고 있는 집이 압류됐는데 나가야 하나 걱정되시죠? 대항력 있으면 계속 살 수 있고, 보증금도 우선 받을 수 있어요.",
  openGraph: { title: "임대차계약 집 압류 임차인 권리 보호", description: "살고 있는 집이 압류됐는데 나가야 하나 걱정되시죠? 대항력 있으면 계속 살 수 있고, 보증금도 우선 받을 수 있어요.", url: "https://jjyu.co.kr/w/임대차계약-집-압류-임차인-권리" },
  alternates: { canonical: "https://jjyu.co.kr/w/임대차계약-집-압류-임차인-권리" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
