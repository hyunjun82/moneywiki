import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원 탈락했다면? 탈락 사유와 재신청 방법 | 머니위키",
  description: "청년월세지원에서 탈락하는 흔한 사유 5가지와 재신청 방법을 정리했어요. 탈락해도 조건을 맞추면 다시 신청할 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-탈락사유-재신청-방법" },
  openGraph: { title: "청년월세지원 탈락했다면? 탈락 사유와 재신청 방법 | 머니위키", description: "청년월세지원에서 탈락하는 흔한 사유 5가지와 재신청 방법을 정리했어요. 탈락해도 조건을 맞추면 다시 신청할 수 있어요.", url: "https://www.jjyu.co.kr/w/청년월세지원-탈락사유-재신청-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
