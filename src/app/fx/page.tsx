import type { Metadata } from "next";
import CalculatorView from "@/components/fx/CalculatorView";

/**
 * /fx — 환율 계산기 (고정 허브)
 *
 * 주소에 날짜를 넣지 않는다. 고정 허브여야 검색 트래픽이 한곳에 쌓인다.
 * 환율은 빌드가 아니라 브라우저가 갱신기 JSON에서 직접 읽는다.
 */

export const metadata: Metadata = {
  title: "환율 계산기 — 오늘 환율로 환전 금액 계산",
  description:
    "매매기준율로 환전 금액을 바로 계산합니다. 달러·엔·유로 등 주요 통화의 현찰 살 때·팔 때 고시 환율과 기간별 추이를 한 화면에서 확인하세요.",
  keywords: ["환율", "환율 계산기", "오늘 환율", "달러 환율", "엔화 환율", "환전 계산"],
  alternates: { canonical: "/fx" },
  openGraph: {
    type: "website",
    url: "/fx",
    title: "환율 계산기 — 오늘 환율로 환전 금액 계산",
    description: "매매기준율 기준 환전 금액과 통화별 고시 환율을 한 화면에서 봅니다.",
  },
};

export default function FxPage() {
  return <CalculatorView />;
}
