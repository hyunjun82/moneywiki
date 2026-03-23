export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약 중 집주인이 바뀌면 나가야 하나? 임차인 보호와 대응 방법 | 머니위키",
  description: "계약 중 집주인이 바뀌면 나가야 하나? 임차인 보호와 대응 방법에 대해 정리했어요. 관련 법령과 기준을 확인하세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임대차-계약기간-중-집주인-변경-퇴거" },
  openGraph: { title: "계약 중 집주인이 바뀌면 나가야 하나? 임차인 보호와 대응 방법", description: "계약 중 집주인이 바뀌면 나가야 하나? 관련 핵심 정보.", url: "https://www.jjyu.co.kr/w/임대차-계약기간-중-집주인-변경-퇴거", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
