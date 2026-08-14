import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "2026년 설 주차장 무료: 행정·공공기관 5일간 개방 안내",
  description: "2026년 설 연휴 행정·공공기관 주차장 무료개방돼요. 2월 14~18일 5일간, 시청·구청·도서관 주차 가능해요",
  openGraph: { title: "2026년 설 주차장 무료: 행정·공공기관 5일간 개방 안내 | 머니위키", description: "2026년 설 연휴 행정·공공기관 주차장 무료개방돼요. 2월 14~18일 5일간, 시청·구청·도서관 주차 가능해요", url: "https://www.jjyu.co.kr/w/설-주차장-무료", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/설-주차장-무료" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
