import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "상가 계약 만료, 보증금은 언제 돌려받나요?",
  description: "상가 계약만료 시 보증금 반환은 점포 인도와 동시에. 월세 일할 정산, 원상복구 범위, 권리금 회수 방법 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상가임대차-계약만료-보증금-월세-의무" },
  openGraph: { title: "상가 계약만료 보증금 반환", description: "보증금 반환, 월세 정산, 원상복구, 권리금 회수.", url: "https://www.jjyu.co.kr/w/상가임대차-계약만료-보증금-월세-의무", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
