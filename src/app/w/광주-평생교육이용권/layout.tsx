import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "광주 평생교육이용권 신청방법 자격 조건 2026 | 머니위키",
  description: "2026 광주시 평생교육이용권 신청 자격·일정·사용처 안내. 35만원 포인트 지원.",
  openGraph: {
    title: "광주 평생교육이용권 신청방법 자격 조건 2026",
    description: "2026 광주시 평생교육이용권 신청 자격·일정·사용처 안내. 35만원 포인트 지원.",
    url: "https://jjyu.co.kr/w/광주-평생교육이용권",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/광주-평생교육이용권",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
