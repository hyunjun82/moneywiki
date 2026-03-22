import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "무보험 교통사고 보험사 청구: 특약 보험금 받는 법 | 머니위키",
  description: "무보험 차량 사고 당했는데 내 보험사에 청구할 수 있다는 거 아시나요? 무보험차상해 특약으로 최대 2억원까지 보상받는 방법을 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/무보험-교통사고-보험사-청구" },
  openGraph: {
    title: "무보험 교통사고 보험사 청구: 특약 보험금 받는 법",
    description: "무보험 차량 사고 당했는데 내 보험사에 청구할 수 있다는 거 아시나요? 무보험차상해 특약으로 최대 2억원까지 보상받는 방법을 알려드려요",
    url: "https://www.jjyu.co.kr/w/무보험-교통사고-보험사-청구",
    type: "article",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
