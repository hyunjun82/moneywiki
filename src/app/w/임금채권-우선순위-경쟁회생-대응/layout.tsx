import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사 망해도 월급 받을 수 있을까? 임금채권 우선순위",
  description: "최종 3개월 임금은 세금·담보보다 먼저 받아요. 회사가 파산·회생해도 임금채권보장기금에서 최대 1,000만원까지 대신 지급해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/임금채권-우선순위-경쟁회생-대응",
  },
  openGraph: {
    title: "회사 망해도 월급 받을 수 있을까? 임금채권 우선순위",
    description: "최종 3개월 임금은 최우선변제 대상이에요. 보장기금 신청 절차도 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임금채권-우선순위-경쟁회생-대응",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
