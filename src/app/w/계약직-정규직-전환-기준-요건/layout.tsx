import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약직 정규직 전환 기준 2년 자동전환 갱신 거절 | 머니위키",
  description: "기간제법 2년 초과 시 무기계약 자동 전환. 갱신기대권 인정 요건과 부당해고구제 신청 절차.",
  openGraph: {
    title: "계약직 정규직 전환 기준 2년 자동전환 갱신 거절",
    description: "2년 초과 자동 전환, 갱신기대권 판단 기준, 부당해고구제 신청.",
    url: "https://jjyu.co.kr/w/계약직-정규직-전환-기준-요건",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/계약직-정규직-전환-기준-요건" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
