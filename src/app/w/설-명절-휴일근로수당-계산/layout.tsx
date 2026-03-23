import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "설 명절 휴일근로수당 계산 월급제 1.5배 시급제 2.5배 | 머니위키",
  description: "설날에 일하면 수당을 받아요. 월급제는 1.5배, 시급제는 2.5배인데 5인 미만 사업장은 다달라요.",
  openGraph: { title: "설 명절 휴일근로수당 계산 월급제 1.5배 시급제 2.5배", description: "설날에 일하면 수당을 받아요. 월급제는 1.5배, 시급제는 2.5배인데 5인 미만 사업장은 다달라요.", url: "https://jjyu.co.kr/w/설-명절-휴일근로수당-계산" },
  alternates: { canonical: "https://jjyu.co.kr/w/설-명절-휴일근로수당-계산" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
