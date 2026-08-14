import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 의료비 공제 완벽 가이드 (2025년)",
  description: "의료비는 총급여의 3%를 초과한 금액에 대해 15% 세액공제를 받을 수 있어요. 본인·부양가족 의료비를 합산해서 공제받으세요.",
  openGraph: { title: "연말정산 의료비 공제 완벽 가이드 (2025년) | 머니위키", description: "의료비는 총급여의 3%를 초과한 금액에 대해 15% 세액공제를 받을 수 있어요. 본인·부양가족 의료비를 합산해서 공제받으세요.", url: "https://www.jjyu.co.kr/w/연말정산-의료비-공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-의료비-공제" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
