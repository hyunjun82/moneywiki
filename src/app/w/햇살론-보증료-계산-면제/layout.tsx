import { Metadata } from "next";

export const metadata: Metadata = {
  title: "햇살론 보증료 계산하고 면제받기",
  description: "햇살론 보증료 계산기로 예상 금액 확인하고, 성실상환·이벤트로 보증료를 줄이는 방법을 배우세요. 보증료율 2.0~3.0%, 면제 조건 4가지 정리.",
  openGraph: {
    title: "햇살론 보증료 계산하고 면제받기",
    description: "서민금융진흥원 90% 보증의 비용을 정확히 이해하고, 성실상환·이벤트로 보증료를 줄이는 방법",
    type: "article",
  },
  other: {
    "article:published_time": "2026-03-25",
    "article:author": "MoneyWiki",
  },
};

export const revalidate = 3600;
export const dynamic = "force-static";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
