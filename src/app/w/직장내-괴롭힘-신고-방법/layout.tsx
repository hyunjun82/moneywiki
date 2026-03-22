import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "직장내 괴롭힘·신고 방법·증거 수집·처벌 | 머니위키",
  description: "직장내 괴롭힘 당하면 회사에 신고하고 고용노동부에 진정할 수 있어요. 증거 확보 방법과 처벌 기준 알려드려요.",
  openGraph: { title: "직장내 괴롭힘·신고 방법·증거 수집·처벌", description: "직장내 괴롭힘 당하면 회사에 신고하고 고용노동부에 진정할 수 있어요. 증거 확보 방법과 처벌 기준 알려드려요.", url: "https://jjyu.co.kr/w/직장내-괴롭힘-신고-방법" },
  alternates: { canonical: "https://jjyu.co.kr/w/직장내-괴롭힘-신고-방법" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
