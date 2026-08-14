import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 직계비속",
  description: "직계비속은 자녀·손자녀·증손자녀를 말해요. 만 20세 이하이고 소득 100만원 이하면 1명당 150만원 인적공제받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-직계비속" },
  openGraph: { title: "연말정산 직계비속 | 머니위키", description: "직계비속은 자녀·손자녀·증손자녀를 말해요. 만 20세 이하이고 소득 100만원 이하면 1명당 150만원 인적공제받아요.", url: "https://www.jjyu.co.kr/w/연말정산-직계비속", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
