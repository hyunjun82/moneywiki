import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "행복주택 혼인신고 전입하면 거주기간 달라지나요 | 머니위키",
  description: "행복주택에 살다가 결혼하면 거주기간이 달라지나요? 자격 변경하면 그 시점부터 새로운 기간이 적용되지만, 전체 최대 14년은 못 넘어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/행복주택-혼인신고-전입-거주기간" },
  openGraph: { title: "행복주택 혼인신고 전입하면 거주기간 달라지나요 | 머니위키", description: "행복주택에 살다가 결혼하면 거주기간이 달라지나요? 자격 변경하면 그 시점부터 새로운 기간이 적용되지만, 전체 최대 14년은 못 넘어요.", url: "https://www.jjyu.co.kr/w/행복주택-혼인신고-전입-거주기간", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
