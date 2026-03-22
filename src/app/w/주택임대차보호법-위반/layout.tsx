import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택임대차보호법 위반 | 머니위키",
  description: "집주인이 법 어기면 어떻게 대응해야 하나요? 신고, 소송, 손해배상 방법",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택임대차보호법-위반" },
  openGraph: { title: "주택임대차보호법 위반 | 머니위키", description: "집주인이 법 어기면 어떻게 대응해야 하나요? 신고, 소송, 손해배상 방법", url: "https://www.jjyu.co.kr/w/주택임대차보호법-위반", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
