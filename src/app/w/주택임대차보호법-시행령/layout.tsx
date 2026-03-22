import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "주택임대차보호법 시행령 | 머니위키",
  description: "소액임차인 기준, 최우선변제금액 등 구체적인 숫자는 시행령에 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/주택임대차보호법-시행령" },
  openGraph: { title: "주택임대차보호법 시행령", description: "소액임차인 기준, 최우선변제금액 등 구체적인 숫자는 시행령에 있어요", url: "https://www.jjyu.co.kr/w/주택임대차보호법-시행령", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
