import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "기초수급자도 실업급여 받을 수 있나요? 중복 수급 정리",
  description: "기초수급자도 실업급여 중복 수급 가능. 다만 소득 인정액에 합산돼서 생계급여가 줄어들 수 있어요. 소득 변동 신고 필수.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기초수급자-실업급여" },
  openGraph: { title: "기초수급자도 실업급여 받을 수 있나요?", description: "중복 수급 가능. 소득 인정액 합산 주의.", url: "https://www.jjyu.co.kr/w/기초수급자-실업급여", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
