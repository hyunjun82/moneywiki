import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "계약갱신청구권 실거주",
  description: "집주인이 실거주한다고 거절했는데 거짓말이면? 손해배상 받을 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약갱신청구권-실거주" },
  openGraph: { title: "계약갱신청구권 실거주", description: "집주인이 실거주한다고 거절했는데 거짓말이면? 손해배상 받을 수 있어요", url: "https://www.jjyu.co.kr/w/계약갱신청구권-실거주", type: "article" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
