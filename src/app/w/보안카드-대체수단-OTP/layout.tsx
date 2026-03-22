import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "보안카드 대신 OTP 쓸 수 있나? 전환 방법과 장점 | 머니위키",
  description: "보안카드 대신 OTP 쓸 수 있나? 전환 방법과 장점에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보안카드-대체수단-OTP" },
  openGraph: { title: "보안카드 대신 OTP 쓸 수 있나? 전환 방법과 장점", description: "보안카드 대신 OTP 쓸 수 있나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/보안카드-대체수단-OTP", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
