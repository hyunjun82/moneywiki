import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "빚이 너무 많아서 개인파산을 고려하고 있다면? 면책 절차와 진행 방법",
  description: "개인파산 신청 후 면책 결정을 받으면 채무가 탕감돼요. 절차와 비용, 면책 불허 사유를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인파산-면책절차-진행-방법" },
  openGraph: { title: "빚이 너무 많아서 개인파산을 고려하고 있다면? 면책 절차와 진행 방법 | 머니위키", description: "개인파산 신청 후 면책 결정을 받으면 채무가 탕감돼요. 절차와 비용, 면책 불허 사유를 정리했어요.", url: "https://www.jjyu.co.kr/w/개인파산-면책절차-진행-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
