import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "집주인 변경 시 임차인 권리 | 머니위키",
  description: "집주인이 바뀌었을 때 임차인의 권리를 알아봅니다. 대항력이 있으면 새 집주인에게도 임대차를 주장할 수 있습니다.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/집주인-변경-임차인-권리" },
  openGraph: { title: "집주인 변경 시 임차인 권리", description: "집주인이 바뀌었을 때 임차인의 권리를 알아봅니다. 대항력이 있으면 새 집주인에게도 임대차를 주장할 수 있습니다.", url: "https://www.jjyu.co.kr/w/집주인-변경-임차인-권리", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
