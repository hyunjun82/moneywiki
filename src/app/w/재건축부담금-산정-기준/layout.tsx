import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "재건축부담금 산정 기준, 계산 방법과 감면 조건 | 머니위키",
  description: "재건축부담금 = 초과이익 x 부과율. 8천만원 이하 면제, 1주택 20년 보유 시 70% 감면. 산정 공식과 간이 계산기를 제공해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/재건축부담금-산정-기준" },
  openGraph: {
    title: "재건축부담금 산정 기준, 계산 방법과 감면 조건 | 머니위키",
    description: "재건축부담금 = 초과이익 x 부과율. 8천만원 이하 면제, 1주택 20년 보유 시 70% 감면.",
    url: "https://www.jjyu.co.kr/w/재건축부담금-산정-기준",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
