import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "예금 있어도 기초연금 될까? 금융재산 공제 기준과 계산",
  description: "예금, 적금, 주식 등 금융재산이 있을 때 기초연금 소득인정액에 반영되는 기준과 공제 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-금융재산-공제기준-계산" },
  openGraph: {
    title: "예금 있어도 기초연금 될까? 금융재산 공제 기준과 계산 | 머니위키",
    description: "예금, 적금, 주식 등 금융재산이 있을 때 기초연금 소득인정액에 반영되는 기준과 공제 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-금융재산-공제기준-계산",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
