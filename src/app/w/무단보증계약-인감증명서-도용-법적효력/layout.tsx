import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "무단 보증계약 인감증명서 도용 법적 효력 | 머니위키",
  description: "가족이 인감증명서를 몰래 가져가 보증인으로 세웠다면 보증책임을 져야 할까요? 무권대리 보증계약의 법적 효력과 대응 방법을 알아봐요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무단보증계약-인감증명서-도용-법적효력" },
  openGraph: { title: "무단 보증계약 인감증명서 도용 법적 효력", description: "가족이 인감증명서를 몰래 가져가 보증인으로 세웠다면 보증책임을 져야 할까요? 무권대리 보증계약의 법적 효력과 대응 방법을 알아봐요.", url: "https://www.jjyu.co.kr/w/무단보증계약-인감증명서-도용-법적효력", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
