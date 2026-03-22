import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 부녀자 공제 | 머니위키",
  description: "부녀자 공제는 배우자 있는 여성 또는 부양가족 있는 세대주 여성에게 연 50만원 추가 소득공제예요. 총급여 3,000만원 이하여야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-부녀자-공제" },
  openGraph: { title: "연말정산 부녀자 공제", description: "부녀자 공제는 배우자 있는 여성 또는 부양가족 있는 세대주 여성에게 연 50만원 추가 소득공제예요. 총급여 3,000만원 이하여야 해요.", url: "https://www.jjyu.co.kr/w/연말정산-부녀자-공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
