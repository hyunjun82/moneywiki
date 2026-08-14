import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "서울 평생교육이용권 신청방법 자격 조건 2026",
  description: "2026 서울시 평생교육이용권 4가지 유형별 신청 자격·일정·사용처 안내. 일반·AI디지털·노인·장애인 이용권 35만원.",
  openGraph: {
    title: "서울 평생교육이용권 신청방법 자격 조건 2026",
    description: "2026 서울시 평생교육이용권 4가지 유형별 신청 자격·일정·사용처 안내. 일반·AI디지털·노인·장애인 이용권 35만원.",
    url: "https://jjyu.co.kr/w/서울-평생교육이용권",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/서울-평생교육이용권",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
