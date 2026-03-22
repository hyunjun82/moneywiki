import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "서울사랑상품권, 경기도에서 쓸 수 있을까? 사용 범위 정리 | 머니위키",
  description: "서울사랑상품권은 서울에서만 사용 가능해요. 경기도에서는 시·군별 지역화폐를 따로 구매해야 해요. 지역사랑상품권 사용 범위와 할인 구매 방법이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/서울사랑상품권-경기도-사용-가능-여부" },
  openGraph: {
    title: "서울사랑상품권, 경기도에서 쓸 수 있을까? 사용 범위 정리 | 머니위키",
    description: "서울사랑상품권은 서울에서만 사용 가능해요. 경기도에서는 시·군별 지역화폐를 따로 구매해야 해요.",
    url: "https://www.jjyu.co.kr/w/서울사랑상품권-경기도-사용-가능-여부",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
