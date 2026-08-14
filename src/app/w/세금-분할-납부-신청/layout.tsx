import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "세금 분할 납부 신청 조건 종류별 정리",
  description: "종합소득세 1천만원 초과 2개월, 종부세 250만원 초과 6개월, 연말정산 10만원 초과 3개월 분납. 홈택스 신청 방법.",
  openGraph: {
    title: "세금 분할 납부 신청 조건 종류별 정리",
    description: "종소세·양도세·종부세·재산세·연말정산 분납 기준과 기간 비교.",
    url: "https://jjyu.co.kr/w/세금-분할-납부-신청",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/세금-분할-납부-신청",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
