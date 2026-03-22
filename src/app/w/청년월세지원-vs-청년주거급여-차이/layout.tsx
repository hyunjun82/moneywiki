import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원이랑 청년주거급여 뭐가 다를까? 차이 비교 | 머니위키",
  description: "청년월세지원과 청년주거급여의 차이를 한눈에 비교했어요. 대상, 금액, 중복 수급 불가 기준까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-vs-청년주거급여-차이" },
  openGraph: { title: "청년월세지원이랑 청년주거급여 뭐가 다를까? 차이 비교 | 머니위키", description: "청년월세지원과 청년주거급여의 차이를 한눈에 비교했어요. 대상, 금액, 중복 수급 불가 기준까지 정리했어요.", url: "https://www.jjyu.co.kr/w/청년월세지원-vs-청년주거급여-차이", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
