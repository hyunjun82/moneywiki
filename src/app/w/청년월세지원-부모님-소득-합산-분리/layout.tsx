import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원 부모님 소득도 봐요? 소득 합산 기준 | 머니위키",
  description: "청년월세지원 신청 시 부모 소득도 확인해요. 원가구 소득 합산 기준과 면제 조건을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-부모님-소득-합산-분리" },
  openGraph: { title: "청년월세지원 부모님 소득도 봐요? 소득 합산 기준 | 머니위키", description: "청년월세지원 신청 시 부모 소득도 확인해요. 원가구 소득 합산 기준과 면제 조건을 정리했어요.", url: "https://www.jjyu.co.kr/w/청년월세지원-부모님-소득-합산-분리", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
