import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가사근로자 최저임금 적용 기관 소속 vs 개인 고용",
  description: "가사서비스 제공기관 소속 가사근로자는 최저임금 적용. 2026년 시급 10,320원, 4대보험 정부 80% 지원, 개인 고용과의 차이.",
  openGraph: {
    title: "가사근로자 최저임금 적용 기관 소속 vs 개인 고용",
    description: "제공기관 소속이면 시급 10,320원 보장. 개인 고용은 적용 제외 가능.",
    url: "https://jjyu.co.kr/w/가사근로자-최저임금-적용",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/가사근로자-최저임금-적용" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
