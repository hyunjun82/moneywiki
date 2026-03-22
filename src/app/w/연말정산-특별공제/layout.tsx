import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 특별공제 — 5가지 항목별 기준과 한도 | 머니위키",
  description: "연말정산 특별공제는 보험료·의료비·교육비·주택자금·기부금 5가지예요. 항목별 공제율, 한도, 맞벌이 배분 전략을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-특별공제" },
  openGraph: { title: "연말정산 특별공제 — 5가지 항목별 기준과 한도", description: "보험료·의료비·교육비·주택자금·기부금 공제 기준 정리.", url: "https://www.jjyu.co.kr/w/연말정산-특별공제", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
