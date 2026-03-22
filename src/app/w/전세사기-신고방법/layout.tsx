import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "전세사기 신고 기관 및 피해자 지원 절차와 방법 | 머니위키",
  description: "전세사기 피해를 당했다면 경찰청과 피해지원센터에 신고해요. 신고 절차와 지원받는 방법을 알려드려요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/전세사기-신고방법" },
  openGraph: {
    title: "전세사기 신고 기관 및 피해자 지원 절차와 방법",
    description: "전세사기 피해를 당했다면 경찰청과 피해지원센터에 신고해요. 신고 절차와 지원받는 방법을 알려드려요.",
    url: "https://www.jjyu.co.kr/w/전세사기-신고방법",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
