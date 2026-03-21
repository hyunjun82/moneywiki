import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "부동산 거래신고 공인중개사 신고방법, 계약 후 30일 이내 절차 | 머니위키",
  description: "공인중개사를 통해 부동산 거래 시 신고 의무자와 절차를 정리했어요. 2026년 계약금 증빙자료 의무화, 미신고 시 500만원 과태료, 신고필증 발급까지 안내해요.",
  openGraph: {
    title: "부동산 거래신고 공인중개사 신고방법, 계약 후 30일 이내 절차 | 머니위키",
    description: "공인중개사 부동산 거래신고 의무자와 2026년 달라진 증빙서류 기준, 신고 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/부동산-거래신고-공인중개사-신고방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/부동산-거래신고-공인중개사-신고방법" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
