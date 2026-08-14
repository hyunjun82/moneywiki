import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "개인사업자 퇴직연금 — IRP 세액공제 한도와 가입 방법",
  description: "개인사업자도 IRP에 가입해서 연 최대 148만원 세액공제를 받을 수 있어요. 가입 자격, 납입 한도, 공제율을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인사업자-퇴직연금" },
  openGraph: { title: "개인사업자 퇴직연금 — IRP 세액공제 한도와 가입 방법", description: "IRP 세액공제 900만원 한도, 공제율 16.5%/13.2% 정리.", url: "https://www.jjyu.co.kr/w/개인사업자-퇴직연금", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
