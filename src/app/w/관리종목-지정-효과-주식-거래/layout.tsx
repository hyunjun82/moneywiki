import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "관리종목 지정되면 주식 거래는? 거래 제한과 상장폐지 절차",
  description: "관리종목 지정 시 신용거래 금지, 상장폐지 절차와 정리매매 기간을 정리했어요. 보유 주식 대응 방법을 알아보세요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/관리종목-지정-효과-주식-거래" },
  openGraph: {
    title: "관리종목 지정되면 주식 거래는? 거래 제한과 상장폐지 절차 | 머니위키",
    description: "관리종목 지정 시 신용거래 금지, 상장폐지 절차와 정리매매 기간을 정리했어요. 보유 주식 대응 방법을 알아보세요.",
    url: "https://www.jjyu.co.kr/w/관리종목-지정-효과-주식-거래",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
