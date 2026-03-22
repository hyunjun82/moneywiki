import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지역사랑상품권 가맹점 등록 거부 사유와 이의신청 방법 | 머니위키",
  description: "지역사랑상품권 가맹점 등록 거부 사유 5가지와 이의신청 방법을 정리했어요. 부적격 업종, 세금 체납, 위반 이력 등 거부 원인별 대응법을 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/지역사랑상품권-가맹점-등록-거부-사유" },
  openGraph: {
    title: "지역사랑상품권 가맹점 등록 거부 사유와 이의신청 방법 | 머니위키",
    description: "지역사랑상품권 가맹점 등록 거부 사유 5가지와 이의신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/지역사랑상품권-가맹점-등록-거부-사유",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
