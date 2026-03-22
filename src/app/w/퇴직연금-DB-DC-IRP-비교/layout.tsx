import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "DB, DC, IRP 중 뭐가 유리한가요? 퇴직연금 유형별 비교 | 머니위키",
  description: "DB는 확정급여, DC는 확정기여, IRP는 개인형이에요. 유형별 장단점과 수령액 차이를 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-DB-DC-IRP-비교" },
  openGraph: { title: "DB, DC, IRP 중 뭐가 유리한가요? 퇴직연금 유형별 비교 | 머니위키", description: "DB는 확정급여, DC는 확정기여, IRP는 개인형이에요. 유형별 장단점과 수령액 차이를 비교했어요.", url: "https://www.jjyu.co.kr/w/퇴직연금-DB-DC-IRP-비교", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
