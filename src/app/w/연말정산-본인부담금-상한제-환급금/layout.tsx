import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 본인부담금 상한제 환급금",
  description: "건강보험 본인부담금 상한제로 환급받은 금액은 의료비 공제에서 빼야 해요. 실손보험금과 같은 원리예요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-본인부담금-상한제-환급금" },
  openGraph: { title: "연말정산 본인부담금 상한제 환급금", description: "건강보험 본인부담금 상한제로 환급받은 금액은 의료비 공제에서 빼야 해요. 실손보험금과 같은 원리예요.", url: "https://www.jjyu.co.kr/w/연말정산-본인부담금-상한제-환급금", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
