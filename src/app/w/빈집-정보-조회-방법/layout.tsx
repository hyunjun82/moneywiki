import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "빈집 정보 조회, 어디서 하나요? 빈집애·부동산원 활용법",
  description: "빈집애(binzibe.kr)에서 전국 빈집 현황을 무료로 조회할 수 있어요. 빈집정보시스템 사용법, 매입 절차, 법적 근거까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/빈집-정보-조회-방법" },
  openGraph: {
    title: "빈집 정보 조회, 어디서 하나요? 빈집애·부동산원 활용법 | 머니위키",
    description: "빈집애(binzibe.kr)에서 전국 빈집 현황을 무료로 조회할 수 있어요. 빈집정보시스템 사용법, 매입 절차, 법적 근거까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/빈집-정보-조회-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
