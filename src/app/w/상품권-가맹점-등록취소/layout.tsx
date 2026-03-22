import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "지역사랑상품권 가맹점 등록 취소 사유와 예방법 | 머니위키",
  description: "현금 전환, 결제 거부, 허위 등록 등 4가지 취소 사유와 이의신청 절차, 재등록 제한 기간을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/상품권-가맹점-등록취소" },
  openGraph: {
    title: "지역사랑상품권 가맹점 등록 취소 사유와 예방법 | 머니위키",
    description: "현금 전환, 결제 거부, 허위 등록 등 4가지 취소 사유와 이의신청 절차, 재등록 제한 기간을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/상품권-가맹점-등록취소",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
