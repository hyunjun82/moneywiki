import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "세액공제와 소득공제, 뭐가 다른가요? 차이점과 절세 효과 비교 | 머니위키",
  description: "소득공제는 과세표준을 줄이고, 세액공제는 세금 자체를 줄여요. 연말정산에서 더 유리한 건 세액공제예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-세액공제-소득공제-차이" },
  openGraph: { title: "세액공제와 소득공제, 뭐가 다른가요? 차이점과 절세 효과 비교 | 머니위키", description: "소득공제는 과세표준을 줄이고, 세액공제는 세금 자체를 줄여요. 연말정산에서 더 유리한 건 세액공제예요.", url: "https://www.jjyu.co.kr/w/연말정산-세액공제-소득공제-차이", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
