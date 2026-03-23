import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 비과세 근로소득 | 머니위키",
  description: "식대·육아수당·출산지원금 같은 비과세 근로소득은 총급여에서 제외돼요. 월 20만원 이하 식대는 세금 안 내요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-비과세-근로소득" },
  openGraph: { title: "연말정산 비과세 근로소득 | 머니위키", description: "식대·육아수당·출산지원금 같은 비과세 근로소득은 총급여에서 제외돼요. 월 20만원 이하 식대는 세금 안 내요.", url: "https://www.jjyu.co.kr/w/연말정산-비과세-근로소득", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
