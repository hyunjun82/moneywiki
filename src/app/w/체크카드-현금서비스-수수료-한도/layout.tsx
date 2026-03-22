import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "체크카드 현금서비스 안 됨, 신용카드 수수료와 한도 | 머니위키",
  description: "체크카드에는 현금서비스 기능이 없어요. 신용카드 현금서비스 이자율 6.9~19.95%, ATM 수수료, 한도 기준을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/체크카드-현금서비스-수수료-한도" },
  openGraph: {
    title: "체크카드 현금서비스 안 됨, 신용카드 수수료와 한도 | 머니위키",
    description: "체크카드에는 현금서비스 기능이 없어요. 신용카드 현금서비스 이자율 6.9~19.95%, ATM 수수료, 한도 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/체크카드-현금서비스-수수료-한도",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
