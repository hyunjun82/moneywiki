import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "뺑소니 무보험 사고 대처법, 범인 못 찾아도 보상받는 방법 | 머니위키",
  description: "뺑소니 무보험 사고 시 정부 보장사업으로 사망 최대 1.5억, 부상 최대 3천만원까지 보상받을 수 있어요. 대처 순서와 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/뺑소니-무보험-사고-대처법" },
  openGraph: {
    title: "뺑소니 무보험 사고 대처법, 범인 못 찾아도 보상받는 방법 | 머니위키",
    description: "뺑소니 무보험 사고 시 정부 보장사업으로 보상받는 방법과 대처 순서를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/뺑소니-무보험-사고-대처법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
