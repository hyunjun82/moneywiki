import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "징계기간 연차휴가 출근율 산정 | 머니위키",
  description: "정직, 출근정지 등 징계기간은 연차휴가 출근율 계산에 어떻게 반영되나요? 징계기간 출근율 처리 방법을 알려드릴게요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/징계기간-연차휴가-출근율-산정" },
  openGraph: {
    title: "징계기간 연차휴가 출근율 산정",
    description: "정직, 출근정지 등 징계기간은 연차휴가 출근율 계산에 어떻게 반영되나요? 징계기간 출근율 처리 방법을 알려드릴게요.",
    url: "https://www.jjyu.co.kr/w/징계기간-연차휴가-출근율-산정",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
