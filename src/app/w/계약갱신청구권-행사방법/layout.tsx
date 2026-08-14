import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약갱신청구권 행사방법, 시기와 거절 사유",
  description: "계약갱신청구권은 만료 6~2개월 전에 행사해요. 1회만 가능하고 임대료 인상은 5% 이내로 제한돼요.",
  openGraph: { title: "계약갱신청구권 행사방법, 시기와 거절 사유 | 머니위키", description: "계약갱신청구권 행사 요건과 절차예요.", url: "https://www.jjyu.co.kr/w/계약갱신청구권-행사방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-행사방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
