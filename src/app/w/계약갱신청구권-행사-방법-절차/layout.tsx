import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "계약갱신청구권 행사 방법 절차 시기 5% 제한",
  description: "전세 만료 6개월~2개월 전 행사. 1회 한정 2년 연장, 임대료 5% 이내 인상 제한. 내용증명 발송 방법과 거절 사유.",
  openGraph: {
    title: "계약갱신청구권 행사 방법 절차 시기 5% 제한",
    description: "만료 6~2개월 전 행사, 1회 한정 2년 연장, 5% 인상 제한.",
    url: "https://jjyu.co.kr/w/계약갱신청구권-행사-방법-절차",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/계약갱신청구권-행사-방법-절차" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
