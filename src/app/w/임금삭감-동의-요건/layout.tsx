import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "임금삭감, 동의 안 하면 되나요? 거부 방법과 노동청 신고 절차 | 머니위키",
  description: "임금삭감은 근로자 개별 서면 동의 없이 불가능해요. 거부 방법(내용증명), 노동청 임금체불 신고 절차, 차액+지연이자(연20%) 청구 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/임금삭감-동의-요건" },
  openGraph: {
    title: "임금삭감, 동의 안 하면 되나요? 거부 방법과 노동청 신고 절차 | 머니위키",
    description: "임금삭감은 근로자 개별 서면 동의 없이 불가능해요. 거부 방법(내용증명), 노동청 임금체불 신고 절차, 차액+지연이자(연20%) 청구 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/임금삭감-동의-요건",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
