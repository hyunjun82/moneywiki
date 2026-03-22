import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원 언제 입금될까? 지급일과 입금 계좌 기준 | 머니위키",
  description: "청년월세지원 선정 후 지급일, 입금 계좌, 지급 방식을 정리했어요. 본인 계좌와 임대인 계좌 중 어디로 오는지 알려줘요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-지급일-입금시기-계좌" },
  openGraph: { title: "청년월세지원 언제 입금될까? 지급일과 입금 계좌 기준 | 머니위키", description: "청년월세지원 선정 후 지급일, 입금 계좌, 지급 방식을 정리했어요. 본인 계좌와 임대인 계좌 중 어디로 오는지 알려줘요.", url: "https://www.jjyu.co.kr/w/청년월세지원-지급일-입금시기-계좌", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
