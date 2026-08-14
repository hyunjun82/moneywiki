import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경매 공유자 우선매수신고 최고가낙찰자 2026",
  description: "경매에서 최고가로 낙찰됐는데 공유자가 우선매수 신고했다면 누가 매수하게 되는지 알려드려요.",
  openGraph: { title: "경매 공유자 우선매수신고 최고가낙찰자 2026", description: "경매에서 최고가로 낙찰됐는데 공유자가 우선매수 신고했다면 누가 매수하게 되는지 알려드려요.", url: "https://jjyu.co.kr/w/경매-공유자-우선매수신고-최고가낙찰자" },
  alternates: { canonical: "https://jjyu.co.kr/w/경매-공유자-우선매수신고-최고가낙찰자" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
