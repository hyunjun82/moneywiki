import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "직원 할인받으면 세금 내야 하나요? 종업원 할인 비과세 조건과 한도 | 머니위키",
  description: "2025년부터 종업원 할인 연 240만원까지 비과세예요. 시가 20% 이상 가격으로 사야 하고, 초과분만 근로소득으로 과세돼요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-종업원-할인-비과세",
  },
  openGraph: {
    title: "직원 할인받으면 세금 내야 하나요? 종업원 할인 비과세 조건과 한도",
    description: "시가 20% 이상 + 연 240만원 이하면 비과세. 초과분만 과세.",
    url: "https://www.jjyu.co.kr/w/연말정산-종업원-할인-비과세",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
