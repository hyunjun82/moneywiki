import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "파견근로자 정기상여금 받기 — 차별 확인부터 노동위원회 신청까지",
  description: "파견직도 정규직과 동일한 업무를 하면 상여금을 받아야 해요. 거부하면 파견근로자보호법 위반이에요. 차별 판단 기준과 시정신청 6개월 기한 내 절차를 안내해요.",
  openGraph: {
    title: "파견근로자 정기상여금 받기 — 차별 확인부터 노동위원회 신청까지",
    description: "파견직도 정규직과 동일한 업무를 하면 상여금을 받아야 해요. 거부하면 파견근로자보호법 위반이에요. 차별 판단 기준과 시정신청 6개월 기한 내 절차를 안내해요.",
    type: "article",
  },
  alternates: {
    canonical: "/w/파견근로자-정기상여금-받기",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
