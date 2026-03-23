import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 세액공제 순서 | 머니위키",
  description: "세액공제는 근로소득세액공제부터 월세세액공제까지 법정 순서대로 적용돼요. 결정세액이 0원이 되면 추가 공제는 불가능해요.",
  openGraph: { title: "연말정산 세액공제 순서", description: "세액공제는 근로소득세액공제부터 월세세액공제까지 법정 순서대로 적용돼요. 결정세액이 0원이 되면 추가 공제는 불가능해요.", url: "https://jjyu.co.kr/w/연말정산-세액공제-순서" },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-세액공제-순서" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
