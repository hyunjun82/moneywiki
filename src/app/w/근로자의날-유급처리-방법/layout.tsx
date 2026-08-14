import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "근로자의 날 유급처리 방법",
  description: "근로자의 날 급여는 어떻게 계산하나요? 유급휴일 처리와 근무 시 수당 계산을 알려드릴게요.",
  openGraph: { title: "근로자의 날 유급처리 방법 | 머니위키", description: "근로자의 날 급여는 어떻게 계산하나요? 유급휴일 처리와 근무 시 수당 계산을 알려드릴게요.", url: "https://www.jjyu.co.kr/w/근로자의날-유급처리-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로자의날-유급처리-방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
