import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "사업자 대출 이자가 높아서 고민이라면? 개인사업자 신용대출 갈아타기 조건과 신청 방법",
  description: "2026년 3월 18일부터 개인사업자도 스마트폰으로 신용대출을 갈아탈 수 있어요. 대상 조건 확인, 신청 절차, 중도상환수수료 체크까지 한 글에 담았어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/개인사업자-신용대출-갈아타기" },
  openGraph: {
    title: "사업자 대출 이자가 높아서 고민이라면? 개인사업자 신용대출 갈아타기 조건과 신청 방법 | 머니위키",
    description: "2026년 3월 18일부터 개인사업자도 스마트폰으로 신용대출을 갈아탈 수 있어요. 대상 조건 확인, 신청 절차, 중도상환수수료 체크까지 한 글에 담았어요.",
    url: "https://www.jjyu.co.kr/w/개인사업자-신용대출-갈아타기",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
