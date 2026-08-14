import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 관리비 항목 구성 내역 10가지",
  description: "아파트 관리비 10개 항목 완전 정리. 일반관리비·청소비·경비비·수선유지비 각각 무엇인지, 전기료·수도료가 별도인 이유까지.",
  openGraph: {
    title: "아파트 관리비 항목 구성 내역 10가지",
    description: "관리비 고지서 뜯어보기. 10개 항목 각각 뭔지 정리했어요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
