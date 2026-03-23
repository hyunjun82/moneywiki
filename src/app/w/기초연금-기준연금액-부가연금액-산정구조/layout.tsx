import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기준연금액이랑 부가연금액 차이? 기초연금 금액 산정 구조 | 머니위키",
  description: "기초연금의 기준연금액과 부가연금액이 뭔지, 어떻게 산정되는지 구조를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-기준연금액-부가연금액-산정구조" },
  openGraph: {
    title: "기준연금액이랑 부가연금액 차이? 기초연금 금액 산정 구조 | 머니위키",
    description: "기초연금의 기준연금액과 부가연금액이 뭔지, 어떻게 산정되는지 구조를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기초연금-기준연금액-부가연금액-산정구조",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
