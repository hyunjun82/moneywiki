import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "맹지 주위토지통행권 통행료 보상",
  description: "거주하는 집에서 공로까지 통로가 없는 맹지라면 옆 토지로 통행할 수 있는지, 통행료를 내야 하는지 알아봐요.",
  openGraph: { title: "맹지 주위토지통행권 통행료 보상 | 머니위키", description: "거주하는 집에서 공로까지 통로가 없는 맹지라면 옆 토지로 통행할 수 있는지, 통행료를 내야 하는지 알아봐요.", url: "https://www.jjyu.co.kr/w/맹지-주위토지통행권-통행료", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/맹지-주위토지통행권-통행료" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
