export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인 표준사업장 인증 요건, 지원금과 신청 방법 | 머니위키",
  description: "장애인 10명 이상 고용하고 편의시설을 갖추면 표준사업장 인증을 받아 최대 10억원 지원금과 4년간 세금 감면 혜택이 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-표준사업장-인증-요건" },
  openGraph: {
    title: "장애인 표준사업장 인증 요건, 지원금과 신청 방법 | 머니위키",
    description: "장애인 10명 이상 고용 시 최대 10억원 지원금과 4년간 세금 감면 혜택이 있어요.",
    url: "https://www.jjyu.co.kr/w/장애인-표준사업장-인증-요건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
