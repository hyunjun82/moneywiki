import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "무보험 차량에 사고 당했는데 보상받을 수 있나요? 청구 절차와 보상 한도 | 머니위키",
  description: "자동차손해배상 보장사업으로 사망 최대 1.5억원, 부상 최대 3천만원까지 보상받을 수 있어요. 무보험차상해 특약이 있으면 1~2주 만에 처리돼요. 청구 방법 정리.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/무보험-교통사고-보상",
  },
  openGraph: {
    title: "무보험 차량에 사고 당했는데 보상받을 수 있나요? 청구 절차와 보상 한도",
    description: "사망 최대 1.5억, 부상 최대 3천만원. 보장사업과 특약 청구 방법.",
    url: "https://www.jjyu.co.kr/w/무보험-교통사고-보상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
