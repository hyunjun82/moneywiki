import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대전 장애인 평생교육이용권 신청방법 2026",
  description: "2026 대전시 장애인 평생교육이용권 정부24 신청 자격·일정·사용처 안내. 35만원 포인트 지원.",
  openGraph: {
    title: "대전 장애인 평생교육이용권 신청방법 2026",
    description: "2026 대전시 장애인 평생교육이용권 정부24 신청 자격·일정·사용처 안내. 35만원 포인트 지원.",
    url: "https://jjyu.co.kr/w/대전-장애인-평생교육이용권",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/대전-장애인-평생교육이용권",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
