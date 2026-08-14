import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "서울사랑상품권 어디서 쓸 수 있나? 사용지역과 제외 업종 정리",
  description: "서울사랑상품권은 서울 25개 구 내 가맹점에서만 사용 가능해요. 경기도·인천은 안 돼요. 28만 가맹점 확인법과 제외 업종을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/서울사랑상품권-사용지역",
  },
  openGraph: {
    title: "서울사랑상품권 어디서 쓸 수 있나? 사용지역과 제외 업종 정리",
    description: "서울 전역 OK, 경기도·인천 NO. 광역형 = 서울 25개 구 전부. 대형마트·백화점 제외.",
    url: "https://www.jjyu.co.kr/w/서울사랑상품권-사용지역",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
