import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지역사랑상품권 찢어졌는데 바꿀 수 있을까? 훼손 재발급 방법 | 머니위키",
  description: "일련번호가 확인 가능하면 재발급 받을 수 있어요. 카드형은 3~5일, 지류형은 현장 즉시 교환돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지역사랑상품권-훼손-재발급" },
  openGraph: {
    title: "지역사랑상품권 찢어졌는데 바꿀 수 있을까? 훼손 재발급 방법 | 머니위키",
    description: "훼손된 지역사랑상품권 재발급 조건, 카드형·지류형 처리 차이, 신청 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/지역사랑상품권-훼손-재발급",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
