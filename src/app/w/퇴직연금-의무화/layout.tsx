import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "퇴직금, 왜 IRP로 받아야 하나요? 퇴직연금 의무화 | 머니위키",
  description: "2022년 4월부터 55세 미만 퇴직자는 퇴직금을 IRP로 받아야 해요. IRP 개설부터 현금 인출까지 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직연금-의무화" },
  openGraph: { title: "퇴직금, 왜 IRP로 받아야 하나요?", description: "55세 미만 IRP 의무. 입금 후 바로 현금 인출 가능.", url: "https://www.jjyu.co.kr/w/퇴직연금-의무화", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
