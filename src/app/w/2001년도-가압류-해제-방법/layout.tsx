import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "2001년 가압류 해제 방법 및 오래된 가압류 취소 신청",
  description: "2001년에 걸린 가압류 어떻게 해제하는지, 25년 된 오래된 가압류 취소 방법 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/2001년도-가압류-해제-방법" },
  openGraph: { title: "2001년 가압류 해제 방법 및 오래된 가압류 취소 신청 | 머니위키", description: "2001년에 걸린 가압류 어떻게 해제하는지, 25년 된 오래된 가압류 취소 방법 알려드려요.", url: "https://www.jjyu.co.kr/w/2001년도-가압류-해제-방법", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
