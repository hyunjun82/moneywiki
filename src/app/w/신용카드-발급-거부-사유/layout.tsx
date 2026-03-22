import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "신용카드 발급 거부 사유, 확인 방법과 대응법 | 머니위키",
  description: "신용카드 발급이 거부되는 주요 사유. 신용점수 부족, 연체 이력, 다중 신청 등. 거부 사유 확인과 신용점수 올리는 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/신용카드-발급-거부-사유" },
  openGraph: { title: "신용카드 발급 거부 사유와 대응법 | 머니위키", description: "신용카드 발급 거부 주요 사유와 대응 방법.", url: "https://www.jjyu.co.kr/w/신용카드-발급-거부-사유", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
