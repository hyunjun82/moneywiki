import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 직계존속 | 머니위키",
  description: "직계존속은 부모·조부모·증조부모를 말해요. 만 60세 이상이고 소득 100만원 이하면 1명당 150만원 인적공제받아요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-직계존속" },
  openGraph: { title: "연말정산 직계존속", description: "직계존속은 부모·조부모·증조부모를 말해요. 만 60세 이상이고 소득 100만원 이하면 1명당 150만원 인적공제받아요.", url: "https://www.jjyu.co.kr/w/연말정산-직계존속", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
