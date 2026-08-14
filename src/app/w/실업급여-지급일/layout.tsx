import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "실업급여 지급일: 실업인정 후 입금 일정 및 고용24 조회 방법",
  description: "실업급여 언제 들어오는지 궁금하시죠. 실업인정 후 보통 2주 내로 입금돼요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/실업급여-지급일" },
  openGraph: { title: "실업급여 지급일: 실업인정 후 입금 일정 및 고용24 조회 방법 | 머니위키", description: "실업급여 언제 들어오는지 궁금하시죠. 실업인정 후 보통 2주 내로 입금돼요", url: "https://www.jjyu.co.kr/w/실업급여-지급일", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
