import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "체크카드로 현금서비스 가능한가요? ATM 한도와 소액신용결제 정리 | 머니위키",
  description: "체크카드는 현금서비스 불가예요. ATM 출금은 1일 최대 600만원, 소액신용결제는 최대 30만원까지 가능해요. 체크카드와 신용카드 차이, 대안을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/체크카드-현금서비스",
  },
  openGraph: {
    title: "체크카드로 현금서비스 가능한가요? ATM 한도와 소액신용결제 정리",
    description: "체크카드 현금서비스 불가. ATM 한도 600만원, 소액신용결제 30만원 정리.",
    url: "https://www.jjyu.co.kr/w/체크카드-현금서비스",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
