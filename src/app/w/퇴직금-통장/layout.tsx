import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "퇴직금 통장, 어떤 계좌로 받아야 하나요?",
  description: "퇴직금을 받을 수 있는 통장 종류와 IRP 통장의 차이를 정리했어요. 세금 차이와 통장 선택 기준을 안내해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/퇴직금-통장" },
  openGraph: {
    title: "퇴직금 통장, 어떤 계좌로 받아야 하나요? | 머니위키",
    description: "퇴직금을 받을 수 있는 통장 종류와 IRP 통장의 차이를 정리했어요. 세금 차이와 통장 선택 기준을 안내해요.",
    url: "https://www.jjyu.co.kr/w/퇴직금-통장",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
