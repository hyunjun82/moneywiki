import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 중소기업 청년",
  description: "중소기업 취업 청년은 5년간 소득세 90% 감면받아요. 세금 200만원이면 180만원 깎여서 20만원만 내요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-중소기업-청년" },
  openGraph: { title: "연말정산 중소기업 청년 | 머니위키", description: "중소기업 취업 청년은 5년간 소득세 90% 감면받아요. 세금 200만원이면 180만원 깎여서 20만원만 내요", url: "https://www.jjyu.co.kr/w/연말정산-중소기업-청년", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
