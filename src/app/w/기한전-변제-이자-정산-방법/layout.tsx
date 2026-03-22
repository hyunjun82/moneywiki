import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "빌린 돈 일찍 갚으려는데, 이자는? 기한전 변제 이자 정산 방법 | 머니위키",
  description: "기한 전에 빚을 갚으면 실제 사용 기간의 이자만 내면 돼요. 민법 규정, 이자 계산법, 은행 조기상환 수수료까지 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/기한전-변제-이자-정산-방법" },
  openGraph: {
    title: "빌린 돈 일찍 갚으려는데, 이자는? 기한전 변제 이자 정산 방법 | 머니위키",
    description: "기한 전에 빚을 갚으면 실제 사용 기간의 이자만 내면 돼요. 민법 규정, 이자 계산법, 은행 조기상환 수수료까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/기한전-변제-이자-정산-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
