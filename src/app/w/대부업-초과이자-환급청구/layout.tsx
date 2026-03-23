import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "대부업 초과이자 환급청구 방법 | 머니위키",
  description: "등록 대부업체에서 법정 최고금리 20%를 초과해 이자를 지급했다면 돌려받을 수 있어요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대부업-초과이자-환급청구" },
  openGraph: { title: "대부업 초과이자 환급청구 방법 | 머니위키", description: "등록 대부업체에서 법정 최고금리 20%를 초과해 이자를 지급했다면 돌려받을 수 있어요", url: "https://www.jjyu.co.kr/w/대부업-초과이자-환급청구", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
