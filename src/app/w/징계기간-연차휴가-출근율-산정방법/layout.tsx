import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "징계기간 연차휴가 출근율 산정 방법 | 머니위키",
  description: "정직·출근정지는 결근 처리로 출근율 하락. 감봉·견책은 영향 없음. 80% 미만 시 연차 발생 기준.",
  openGraph: { title: "징계기간 연차휴가 출근율 산정 방법", description: "징계 유형별 출근 처리와 연차 영향.", url: "https://jjyu.co.kr/w/징계기간-연차휴가-출근율-산정방법" },
  alternates: { canonical: "https://jjyu.co.kr/w/징계기간-연차휴가-출근율-산정방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
