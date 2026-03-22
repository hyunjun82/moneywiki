import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택 경매 입찰 확인사항 체크리스트 2026 | 머니위키",
  description: "주택 경매에 참가하기 전에 반드시 확인해야 할 사항들이 있어요. 권리 분석부터 입찰 보증금까지 꼼꼼히 체크하세요.",
  openGraph: { title: "주택 경매 입찰 확인사항 체크리스트 2026 | 머니위키", description: "주택 경매에 참가하기 전에 반드시 확인해야 할 사항들이 있어요. 권리 분석부터 입찰 보증금까지 꼼꼼히 체크하세요.", url: "https://www.jjyu.co.kr/w/주택-경매-입찰-확인사항", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택-경매-입찰-확인사항" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
