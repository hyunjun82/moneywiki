import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "건설 일용직 실업급여 수급 조건 및 기준",
  description: "건설 현장에서 일당받고 일했어도 실업급여 받을 수 있어요. 180일 근로하면 자격 충족돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/건설-일용직-실업급여-수급-조건" },
  openGraph: {
    title: "건설 일용직 실업급여 수급 조건 및 기준",
    description: "건설 현장에서 일당받고 일했어도 실업급여 받을 수 있어요. 180일 근로하면 자격 충족돼요.",
    url: "https://www.jjyu.co.kr/w/건설-일용직-실업급여-수급-조건",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
