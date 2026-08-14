import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "연말정산 성과공유 중소기업",
  description: "성과공유 중소기업에서 받은 경영성과급은 50% 소득세 감면 혜택이 있어요",
  openGraph: { title: "연말정산 성과공유 중소기업 | 머니위키", description: "성과공유 중소기업에서 받은 경영성과급은 50% 소득세 감면 혜택이 있어요", url: "https://www.jjyu.co.kr/w/연말정산-성과공유-중소기업", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-성과공유-중소기업" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
