import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원 자격 조건, 나이·소득·재산 기준 한번에 확인 | 머니위키",
  description: "청년월세지원 자격 조건을 나이, 소득, 재산, 주거 유형별로 정리했어요. 내가 대상인지 바로 확인할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-자격조건-나이-소득-재산" },
  openGraph: { title: "청년월세지원 자격 조건, 나이·소득·재산 기준 한번에 확인 | 머니위키", description: "청년월세지원 자격 조건을 나이, 소득, 재산, 주거 유형별로 정리했어요. 내가 대상인지 바로 확인할 수 있어요.", url: "https://www.jjyu.co.kr/w/청년월세지원-자격조건-나이-소득-재산", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
