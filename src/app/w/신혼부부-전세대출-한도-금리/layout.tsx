import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "신혼부부 전세대출, 얼마까지 빌릴 수 있나요? 한도·금리·신청 조건 | 머니위키",
  description: "신혼부부 전용 버팀목 전세대출은 수도권 최대 2.5억 원, 최저 금리 연 1.0%예요. 부부합산 연소득 7,500만 원 이하, 혼인 7년 이내 무주택 세대주가 신청할 수 있어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/신혼부부-전세대출-한도-금리",
  },
  openGraph: {
    title: "신혼부부 전세대출 한도·금리·신청 조건",
    description: "수도권 최대 2.5억, 최저 연 1.0%. 자격 조건과 신청 절차 정리.",
    url: "https://www.jjyu.co.kr/w/신혼부부-전세대출-한도-금리",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
