import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "해외근무 해외연수 연차휴가 산정 | 머니위키",
  description: "해외근무기간이나 해외연수기간이 있으면 연차휴가는 어떻게 계산하나요? 출근율 산정 방법을 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/해외근무-해외연수-연차휴가-산정" },
  openGraph: { title: "해외근무 해외연수 연차휴가 산정 | 머니위키", description: "해외근무기간이나 해외연수기간이 있으면 연차휴가는 어떻게 계산하나요? 출근율 산정 방법을 알려드릴게요.", url: "https://www.jjyu.co.kr/w/해외근무-해외연수-연차휴가-산정", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
