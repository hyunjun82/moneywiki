import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "DTI 계산 방법 DSR 차이 | 머니위키",
  description: "DTI와 DSR 계산법과 차이점을 알려드릴게요. 소득 대비 대출 상환 비율이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/DTI-계산-방법" },
  openGraph: {
    title: "DTI 계산 방법 DSR 차이",
    description: "DTI와 DSR 계산법과 차이점을 알려드릴게요. 소득 대비 대출 상환 비율이에요.",
    url: "https://www.jjyu.co.kr/w/DTI-계산-방법",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
