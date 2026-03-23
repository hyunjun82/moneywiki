import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "대출 계약 후 철회, 14일 이내 조건과 절차 | 머니위키",
  description: "대출 계약서 받은 날부터 14일 이내에 위약금 없이 철회할 수 있어요. 내용증명 작성법, 준비 서류, 철회 불가 예외까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/대출계약-철회-기간-조건" },
  openGraph: {
    title: "대출 계약 후 철회, 14일 이내 조건과 절차 | 머니위키",
    description: "대출 계약서 받은 날부터 14일 이내에 위약금 없이 철회할 수 있어요. 내용증명 작성법, 준비 서류, 철회 불가 예외까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/대출계약-철회-기간-조건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
