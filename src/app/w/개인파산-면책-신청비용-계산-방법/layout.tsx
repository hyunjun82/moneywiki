import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "개인파산 면책 신청비용 계산 방법 및 소송구조 면제",
  description: "개인파산 신청하는데 비용이 얼마나 드는지 궁금하시죠. 인지대, 송달료, 관재인 비용 계산 방법과 무료 지원 받는 법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인파산-면책-신청비용-계산-방법" },
  openGraph: { title: "개인파산 면책 신청비용 계산 방법 및 소송구조 면제 | 머니위키", description: "개인파산 신청하는데 비용이 얼마나 드는지 궁금하시죠. 인지대, 송달료, 관재인 비용 계산 방법과 무료 지원 받는 법을 알려드려요.", url: "https://www.jjyu.co.kr/w/개인파산-면책-신청비용-계산-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
