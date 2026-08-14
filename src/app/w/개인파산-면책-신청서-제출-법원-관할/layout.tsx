import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "개인파산 면책 신청서 제출 법원 관할 및 제출 방법",
  description: "개인파산 신청서를 어느 법원에 내야 하는지 궁금하시죠. 주소지별 관할법원 찾는 법과 제출 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인파산-면책-신청서-제출-법원-관할" },
  openGraph: {
    title: "개인파산 면책 신청서 제출 법원 관할 및 제출 방법",
    description: "개인파산 신청서를 어느 법원에 내야 하는지 궁금하시죠. 주소지별 관할법원 찾는 법과 제출 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/개인파산-면책-신청서-제출-법원-관할",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
