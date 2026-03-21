import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "주거용 오피스텔, 주택 수에 포함되나요? 취득세·종부세·양도세 비교 | 머니위키",
  description: "주거용 오피스텔은 주택 수에 포함되어 취득세 1~12%, 종부세 합산, 양도세 중과 대상이에요. 업무용은 4.6% 고정이고 종부세에서 빠져요. 용도별 세금 차이를 비교해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/주거용-오피스텔",
  },
  openGraph: {
    title: "주거용 오피스텔 세금 비교 — 주택 수 포함 기준",
    description: "업무용 4.6% vs 주거용 1~12%. 종부세·양도세 차이까지.",
    url: "https://www.jjyu.co.kr/w/주거용-오피스텔",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
