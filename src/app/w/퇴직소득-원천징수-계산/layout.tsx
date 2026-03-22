import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직소득 원천징수 세율 계산 방법 2026 | 머니위키",
  description: "퇴직할 때 회사가 떼는 세금이 퇴직소득세예요. 근속연수에 따라 세율이 달라지고, 세액공제까지 받으면 실제 부담은 줄어들어요. 계산법과 신고 기한까지 알려드려요",
  openGraph: { title: "퇴직소득 원천징수 세율 계산 방법 2026 | 머니위키", description: "퇴직할 때 회사가 떼는 세금이 퇴직소득세예요. 근속연수에 따라 세율이 달라지고, 세액공제까지 받으면 실제 부담은 줄어들어요. 계산법과 신고 기한까지 알려드려요", url: "https://www.jjyu.co.kr/w/퇴직소득-원천징수-계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직소득-원천징수-계산" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
