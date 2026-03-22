import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지역사랑상품권 vs 온누리상품권, 할인율·사용처·소득공제 비교 | 머니위키",
  description: "지역사랑상품권과 온누리상품권의 차이를 2026년 기준으로 비교했어요. 할인율, 사용처, 구매한도, 소득공제율까지 한눈에 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지역사랑상품권-온누리상품권-차이" },
  openGraph: {
    title: "지역사랑상품권 vs 온누리상품권, 할인율·사용처·소득공제 비교 | 머니위키",
    description: "지역사랑상품권과 온누리상품권의 차이를 2026년 기준으로 비교했어요. 할인율, 사용처, 구매한도, 소득공제율까지 한눈에 정리했어요.",
    url: "https://www.jjyu.co.kr/w/지역사랑상품권-온누리상품권-차이",
    type: "article", siteName: "머니위키", locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
