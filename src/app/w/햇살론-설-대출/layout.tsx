import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "햇살론 설 대출, 받을 수 있을까? 일반·특례 조건과 방법 | 머니위키",
  description: "2026년 개편된 햇살론은 일반(최대 1,500만원, 연 10%)과 특례(최대 1,000만원, 연 12.5%)로 나뉘어요. 소득 3,500만원 이하면 신용 무관 신청 가능하고, 배려대상자는 9.9%까지 가능해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/햇살론-설-대출",
  },
  openGraph: {
    title: "햇살론 설 대출, 받을 수 있을까?",
    description: "일반(최대 10%) vs 특례(12.5%) 비교. 소득 3,500만원 이하 신청 가능.",
    url: "https://www.jjyu.co.kr/w/햇살론-설-대출",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
