import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약직도 퇴직금 받을 수 있는 규정이 있나요? 지급 조건·청구 절차까지 | 머니위키",
  description: "계약직이라도 1년 이상·주 15시간 이상이면 퇴직금을 받을 권리가 생겨요. 지급 조건, 갱신 합산 규칙, 청구 절차, 미지급 시 연 20% 지연이자 청구까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/계약직-퇴직금-지급규정" },
  openGraph: {
    title: "계약직도 퇴직금 받을 수 있는 규정이 있나요? 지급 조건·청구 절차까지 | 머니위키",
    description: "계약직이라도 1년 이상·주 15시간 이상이면 퇴직금을 받을 권리가 생겨요. 지급 조건, 갱신 합산 규칙, 청구 절차, 미지급 시 연 20% 지연이자 청구까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/계약직-퇴직금-지급규정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
