import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원 다른 복지랑 같이 받을 수 있을까? 중복 수급 기준 | 머니위키",
  description: "청년월세지원과 다른 복지 제도를 동시에 받을 수 있는지 정리했어요. 중복 가능한 제도와 불가능한 제도를 비교했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-중복수급-다른복지-동시" },
  openGraph: { title: "청년월세지원 다른 복지랑 같이 받을 수 있을까? 중복 수급 기준 | 머니위키", description: "청년월세지원과 다른 복지 제도를 동시에 받을 수 있는지 정리했어요. 중복 가능한 제도와 불가능한 제도를 비교했어요.", url: "https://www.jjyu.co.kr/w/청년월세지원-중복수급-다른복지-동시", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
