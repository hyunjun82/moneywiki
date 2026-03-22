import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "양도소득세 장기보유특별공제 거주기간 및 계산법 | 머니위키",
  description: "집을 오래 보유하면 양도세가 확 줄어요. 1세대 1주택은 보유+거주 10년 이상이면 최대 80% 공제받아요. 다주택자는 15년 보유해도 30%가 한도고요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/양도소득세-장기보유특별공제" },
  openGraph: { title: "양도소득세 장기보유특별공제 거주기간 및 계산법", description: "집을 오래 보유하면 양도세가 확 줄어요. 1세대 1주택은 보유+거주 10년 이상이면 최대 80% 공제받아요. 다주택자는 15년 보유해도 30%가", url: "https://www.jjyu.co.kr/w/양도소득세-장기보유특별공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
