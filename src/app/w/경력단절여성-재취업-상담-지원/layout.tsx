import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "경력단절여성 재취업 상담 지원 | 머니위키",
  description: "아이 키우느라 일 못 한 지 오래됐는데, 다시 일하려니 막막하시죠? 재취업 지원받을 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/경력단절여성-재취업-상담-지원" },
  openGraph: { title: "경력단절여성 재취업 상담 지원 | 머니위키", description: "아이 키우느라 일 못 한 지 오래됐는데, 다시 일하려니 막막하시죠? 재취업 지원받을 수 있어요", url: "https://www.jjyu.co.kr/w/경력단절여성-재취업-상담-지원", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
