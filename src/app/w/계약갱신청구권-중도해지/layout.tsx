import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약갱신청구권 중도해지 | 머니위키",
  description: "갱신해서 2년 더 살기로 했는데 중간에 나가고 싶으면? 3개월 전 통보하면 돼요",
  openGraph: { title: "계약갱신청구권 중도해지 | 머니위키", description: "갱신해서 2년 더 살기로 했는데 중간에 나가고 싶으면? 3개월 전 통보하면 돼요", url: "https://www.jjyu.co.kr/w/계약갱신청구권-중도해지", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-중도해지" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
