import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ISA 계좌, 어디서 만들어야 할까? 증권사 수수료 비교와 추천 | 머니위키",
  description: "중개형 ISA는 미래에셋·삼성증권이 수수료 최저예요. 신탁형은 KB국민은행이 좋고, 투자 스타일에 따라 유형부터 골라야 해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/ISA계좌-추천" },
  openGraph: {
    title: "ISA 계좌, 어디서 만들어야 할까? 증권사 수수료 비교와 추천 | 머니위키",
    description: "중개형 ISA는 미래에셋·삼성증권이 수수료 최저예요. 신탁형은 KB국민은행이 좋고, 투자 스타일에 따라 유형부터 골라야 해요.",
    url: "https://www.jjyu.co.kr/w/ISA계좌-추천",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
