import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "실업급여 180일 자격 조건과 실제 수급 기간 계산 방법",
  description: "180일은 신청 자격 조건이에요. 실제 수급 기간은 나이·가입기간에 따라 120~270일. 퇴직 후 12개월 이내 신청 필수.",
  openGraph: {
    title: "실업급여 180일 자격 조건과 실제 수급 기간 계산 방법",
    description: "180일은 자격 조건. 실제 수급은 120~270일. 나이와 가입기간별 수급일수 표 정리.",
    url: "https://jjyu.co.kr/w/실업급여-180일",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/실업급여-180일",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
