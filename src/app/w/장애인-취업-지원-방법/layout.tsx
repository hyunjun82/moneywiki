export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "장애인 취업, 어디서 도움받을 수 있을까? 무료 지원 프로그램과 신청 절차 | 머니위키",
  description: "한국장애인고용공단에서 취업성공패키지, 직업훈련, 고용장려금까지 전부 무료로 지원받을 수 있어요. 전화 한 통(1588-1519)으로 시작하는 신청 방법을 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/장애인-취업-지원-방법" },
  openGraph: {
    title: "장애인 취업, 어디서 도움받을 수 있을까? 무료 지원 프로그램과 신청 절차 | 머니위키",
    description: "한국장애인고용공단에서 취업성공패키지, 직업훈련, 고용장려금까지 전부 무료로 지원받을 수 있어요. 전화 한 통(1588-1519)으로 시작하는 신청 방법을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/장애인-취업-지원-방법",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
