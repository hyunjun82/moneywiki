import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "부양가족 소득이 있으면 인적공제를 못 받나요? 소득 기준 100만원과 초과 시 처리",
  description: "부양가족 연간 소득금액 100만원(총급여 500만원) 초과 시 인적공제 대상에서 제외돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/부양가족-소득기준-초과-인적공제" },
  openGraph: { title: "부양가족 소득이 있으면 인적공제를 못 받나요? 소득 기준 100만원과 초과 시 처리 | 머니위키", description: "부양가족 연간 소득금액 100만원(총급여 500만원) 초과 시 인적공제 대상에서 제외돼요.", url: "https://www.jjyu.co.kr/w/부양가족-소득기준-초과-인적공제", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
