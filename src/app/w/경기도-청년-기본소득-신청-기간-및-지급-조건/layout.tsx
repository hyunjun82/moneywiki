import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경기도 청년 기본소득 신청 기간 지급 조건 | 머니위키",
  description: "만 24세 경기도 거주 청년 분기당 25만원, 연 최대 100만원 지역화폐 지급. 잡아바 플랫폼 온라인 신청 방법과 자격 조건.",
  openGraph: {
    title: "경기도 청년 기본소득 신청 기간 지급 조건",
    description: "소득 무관 만 24세 경기도 청년이면 신청 가능. 분기당 25만원 지역화폐.",
    url: "https://jjyu.co.kr/w/경기도-청년-기본소득-신청-기간-및-지급-조건",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/경기도-청년-기본소득-신청-기간-및-지급-조건",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
