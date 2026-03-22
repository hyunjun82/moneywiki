import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종신보험 상속세 신고 기한 서류 방법 | 머니위키",
  description: "종신보험금 상속세 신고 기한은 사망일 속한 달 말일부터 6개월. 필요 서류와 계약 구조별 과세 기준.",
  openGraph: { title: "종신보험 상속세 신고 기한 서류 방법", description: "사망 후 6개월 이내 신고, 보험 계약 구조별 과세.", url: "https://jjyu.co.kr/w/종신보험-상속세-신고" },
  alternates: { canonical: "https://jjyu.co.kr/w/종신보험-상속세-신고" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
