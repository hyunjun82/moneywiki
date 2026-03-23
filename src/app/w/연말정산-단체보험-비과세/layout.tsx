import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "회사 단체보험, 세금 내야 하나? 비과세 조건과 한도 | 머니위키",
  description: "전 직원 대상 단체순수보장성보험과 단체환급부보험은 각각 연 70만원까지 비과세예요. 임원만 가입하면 전액 과세돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-단체보험-비과세" },
  openGraph: {
    title: "회사 단체보험, 세금 내야 하나? 비과세 조건과 한도 | 머니위키",
    description: "전 직원 대상 단체순수보장성보험과 단체환급부보험은 각각 연 70만원까지 비과세예요. 임원만 가입하면 전액 과세돼요.",
    url: "https://www.jjyu.co.kr/w/연말정산-단체보험-비과세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
