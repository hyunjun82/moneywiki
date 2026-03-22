import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "육아 시간선택제 일자리 신청 방법 | 근로시간 단축 급여 보전 조건 | 머니위키",
  description: "아이 때문에 풀타임이 힘드신가요? 육아 시간선택제 일자리로 근로시간을 줄이면서 급여 보전도 받을 수 있어요. 신청 조건부터 절차까지 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/육아-시간선택제-일자리" },
  openGraph: { title: "육아 시간선택제 일자리 신청 방법 | 근로시간 단축 급여 보전 조건 | 머니위키", description: "아이 때문에 풀타임이 힘드신가요? 육아 시간선택제 일자리로 근로시간을 줄이면서 급여 보전도 받을 수 있어요. 신청 조건부터 절차까지 알려드려요.", url: "https://www.jjyu.co.kr/w/육아-시간선택제-일자리", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
