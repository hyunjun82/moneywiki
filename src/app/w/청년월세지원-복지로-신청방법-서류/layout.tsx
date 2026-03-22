import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년월세지원 복지로 온라인 신청 방법과 필요 서류 | 머니위키",
  description: "청년월세지원 복지로 온라인 신청 절차를 단계별로 안내해요. 필요 서류와 제출 방법까지 한번에 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년월세지원-복지로-신청방법-서류" },
  openGraph: { title: "청년월세지원 복지로 온라인 신청 방법과 필요 서류 | 머니위키", description: "청년월세지원 복지로 온라인 신청 절차를 단계별로 안내해요. 필요 서류와 제출 방법까지 한번에 정리했어요.", url: "https://www.jjyu.co.kr/w/청년월세지원-복지로-신청방법-서류", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
