import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약갱신청구권 1회 2년 재계약 거절 사유",
  description: "2년 더 살고 싶은데 집주인이 거절할 수 있나요? 정당한 거절 사유와 임차인 권리를 알아봐요.",
  openGraph: { title: "계약갱신청구권 1회 2년 재계약 거절 사유 | 머니위키", description: "2년 더 살고 싶은데 집주인이 거절할 수 있나요? 정당한 거절 사유와 임차인 권리를 알아봐요.", url: "https://www.jjyu.co.kr/w/계약갱신청구권-재계약-거절-사유", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-재계약-거절-사유" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
