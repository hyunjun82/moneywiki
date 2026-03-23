import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초연금이 갑자기 끊겼다면? 지급정지 사유와 해제 방법 | 머니위키",
  description: "기초연금이 갑자기 안 들어오는 이유는 해외 체류, 소득 변동, 거주지 미신고 등이에요. 정지 사유별 해제 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초연금-지급정지-사유-해제방법" },
  openGraph: { title: "기초연금이 갑자기 끊겼다면? 지급정지 사유와 해제 방법 | 머니위키", description: "기초연금이 갑자기 안 들어오는 이유는 해외 체류, 소득 변동, 거주지 미신고 등이에요. 정지 사유별 해제 방법을 정리했어요.", url: "https://www.jjyu.co.kr/w/기초연금-지급정지-사유-해제방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
