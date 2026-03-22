import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "재산 압류·경매 신청 방법, 채무 변제 절차와 서류 | 머니위키",
  description: "채무자가 돈을 안 갚을 때 판결문 확보 → 강제집행 → 압류 → 경매 → 배당까지. 절차와 필요 서류를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/채무변제-재산압류-경매신청" },
  openGraph: { title: "재산 압류·경매 신청 방법 | 머니위키", description: "채무자 재산 압류부터 경매 배당까지 전체 절차.", url: "https://www.jjyu.co.kr/w/채무변제-재산압류-경매신청", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
