import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택 증축 대수선 건축법 허가 절차 2026 | 머니위키",
  description: "집을 늘리거나 크게 고치려는데 증축이랑 대수선이 뭐가 다른가요? 허가 받아야 하나요? 증축은 면적 늘리는 거, 대수선은 구조 바꾸는 거예요",
  openGraph: { title: "주택 증축 대수선 건축법 허가 절차 2026 | 머니위키", description: "집을 늘리거나 크게 고치려는데 증축이랑 대수선이 뭐가 다른가요? 허가 받아야 하나요? 증축은 면적 늘리는 거, 대수선은 구조 바꾸는 거예요", url: "https://www.jjyu.co.kr/w/주택-증축-대수선-건축법-허가", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-증축-대수선-건축법-허가" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
