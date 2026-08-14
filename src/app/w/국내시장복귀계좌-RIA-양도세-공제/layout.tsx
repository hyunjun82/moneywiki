import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "국내시장복귀계좌 RIA·양도세 공제·국민성장펀드",
  description: "국내시장복귀계좌(RIA)로 해외주식 매도 후 국내주식 투자하면 양도세 최대 100% 공제받아요. 1분기 매도 시 전액 공제, 5천만원 한도예요.",
  openGraph: { title: "국내시장복귀계좌 RIA·양도세 공제·국민성장펀드", description: "국내시장복귀계좌(RIA)로 해외주식 매도 후 국내주식 투자하면 양도세 최대 100% 공제받아요. 1분기 매도 시 전액 공제, 5천만원 한도예요.", url: "https://jjyu.co.kr/w/국내시장복귀계좌-RIA-양도세-공제" },
  alternates: { canonical: "https://jjyu.co.kr/w/국내시장복귀계좌-RIA-양도세-공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
