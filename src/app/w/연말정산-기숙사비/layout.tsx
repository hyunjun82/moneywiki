import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 기숙사비 교육비 공제 불가 카드 공제 | 머니위키",
  description: "대학 기숙사비는 교육비 세액공제 대상이 아니에요. 등록금(수업료)만 공제. 카드 결제 시 신용카드 소득공제 가능.",
  openGraph: { title: "연말정산 기숙사비 교육비 공제 불가", description: "기숙사비 교육비 공제 불가, 등록금만 공제.", url: "https://jjyu.co.kr/w/연말정산-기숙사비" },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-기숙사비" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
