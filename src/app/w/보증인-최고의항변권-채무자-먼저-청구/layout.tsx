import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "보증인인데 나한테 먼저 청구? 최고·검색의 항변권 사용법",
  description: "단순보증인은 주채무자에게 먼저 청구하라고 거부할 수 있어요. 민법 437조, 단순보증 vs 연대보증 차이, 항변권 행사 절차를 정리했어요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/보증인-최고의항변권-채무자-먼저-청구" },
  openGraph: {
    title: "보증인인데 나한테 먼저 청구? 최고·검색의 항변권 사용법 | 머니위키",
    description: "단순보증인은 주채무자에게 먼저 청구하라고 거부할 수 있어요. 민법 437조, 단순보증 vs 연대보증 차이, 항변권 행사 절차를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/보증인-최고의항변권-채무자-먼저-청구",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
