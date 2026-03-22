import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택담보대출 | 머니위키",
  description: "주택담보대출 조건과 한도를 알아봅니다. LTV, DTI, DSR 규제와 금리, 상환 방식을 정리합니다.",
  openGraph: { title: "주택담보대출 | 머니위키", description: "주택담보대출 조건과 한도를 알아봅니다. LTV, DTI, DSR 규제와 금리, 상환 방식을 정리합니다.", url: "https://www.jjyu.co.kr/w/주택담보대출", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택담보대출" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
