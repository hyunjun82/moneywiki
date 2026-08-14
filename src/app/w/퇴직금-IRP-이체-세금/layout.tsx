import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직금 IRP 이체 시 세금, 어떻게 처리되나요?",
  description: "퇴직금을 IRP로 이체하면 세금이 유예되고, 인출 시점에 정산돼요. 이체와 인출 시 세금 차이, 절세 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-IRP-이체-세금" },
  openGraph: { title: "퇴직금 IRP 이체 시 세금, 어떻게 처리되나요? | 머니위키", description: "퇴직금을 IRP로 이체하면 세금이 유예되고, 인출 시점에 정산돼요. 이체와 인출 시 세금 차이, 절세 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/퇴직금-IRP-이체-세금", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
