import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약갱신청구권 쓴 집, 매매하면 어떻게 되나요? 매수인과 임차인 권리 관계 | 머니위키",
  description: "갱신된 계약 기간 중 집이 팔려도 임차인 권리는 유지돼요. 매수인이 기존 계약을 승계해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-매매" },
  openGraph: { title: "계약갱신청구권 쓴 집, 매매하면 어떻게 되나요? 매수인과 임차인 권리 관계 | 머니위키", description: "갱신된 계약 기간 중 집이 팔려도 임차인 권리는 유지돼요. 매수인이 기존 계약을 승계해요.", url: "https://www.jjyu.co.kr/w/계약갱신청구권-매매", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
