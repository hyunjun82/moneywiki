import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산에서 놓친 공제, 나중에 돌려받을 수 있나요? 경정청구 방법과 기한 | 머니위키",
  description: "5년 이내에 홈택스에서 경정청구하면 놓친 공제를 돌려받을 수 있어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-경정청구" },
  openGraph: { title: "연말정산에서 놓친 공제, 나중에 돌려받을 수 있나요? 경정청구 방법과 기한 | 머니위키", description: "5년 이내에 홈택스에서 경정청구하면 놓친 공제를 돌려받을 수 있어요.", url: "https://www.jjyu.co.kr/w/연말정산-경정청구", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
