import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "하나카드 아이행복카드, 어떻게 만드나? 발급과 바우처 혜택 | 머니위키",
  description: "아이행복카드(국민행복카드)로 보육료·유아학비·임신바우처를 한 장으로 관리해요. 복지로 자격 신청 후 하나카드 앱에서 발급 가능하고, 만 0~5세 자녀가 대상이에요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/하나카드-아이행복카드",
  },
  openGraph: {
    title: "하나카드 아이행복카드, 어떻게 만드나?",
    description: "보육료·유아학비·임신바우처 한 장으로. 발급 절차와 혜택 안내.",
    url: "https://www.jjyu.co.kr/w/하나카드-아이행복카드",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
