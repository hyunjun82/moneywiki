import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "배우자재산 담보제공 대출변제 책임",
  description: "남편 빚인데 왜 제 부동산을 매각하려고 하나요? 배우자 재산을 담보로 제공한 경우 대출 변제 책임과 권리를 알아봐요.",
  openGraph: { title: "배우자재산 담보제공 대출변제 책임", description: "남편 빚인데 왜 제 부동산을 매각하려고 하나요? 배우자 재산을 담보로 제공한 경우 대출 변제 책임과 권리를 알아봐요.", url: "https://jjyu.co.kr/w/배우자재산-담보제공-대출변제-책임" },
  alternates: { canonical: "https://jjyu.co.kr/w/배우자재산-담보제공-대출변제-책임" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
