import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가압류 신청 비용, 인지대부터 담보금까지 정리",
  description: "가압류 인지대는 채권금액 관계없이 정액 1만원이에요. 전자소송이면 9천원이고, 송달료·담보제공금까지 합한 전체 비용을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/가압류-신청-인지-금액",
  },
  openGraph: {
    title: "가압류 신청 비용, 인지대부터 담보금까지 정리",
    description: "인지대 1만원(전자소송 9천원) + 송달료 + 담보금. 전체 비용 한눈에.",
    url: "https://www.jjyu.co.kr/w/가압류-신청-인지-금액",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
