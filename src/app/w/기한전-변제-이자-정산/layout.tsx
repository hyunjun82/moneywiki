import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "빌린 돈 일찍 갚으면 이자는? 기한전 변제 이자 정산 방법",
  description: "기한전 변제 시 실제 사용 기간 이자만 내면 돼요. 민법 규정, 이자 계산법, 은행 조기상환 수수료, 개인 간 거래 실무 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기한전-변제-이자-정산" },
  openGraph: {
    title: "빌린 돈 일찍 갚으면 이자는? 기한전 변제 이자 정산 방법 | 머니위키",
    description: "기한전 변제 시 실제 사용 기간 이자만 내면 돼요. 민법 규정, 이자 계산법, 실무 절차 정리.",
    url: "https://www.jjyu.co.kr/w/기한전-변제-이자-정산",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
