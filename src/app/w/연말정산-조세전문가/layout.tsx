import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 세무사 조세전문가 대행 비용",
  description: "연말정산 세무사 대행 비용은 10~30만원이에요. 소득이 복잡하면 전문가 도움으로 환급액을 더 늘릴 수 있어요.",
  openGraph: {
    title: "연말정산 세무사 조세전문가 대행 비용",
    description: "세무사에게 연말정산 맡기는 방법, 비용, 서비스 범위를 정리했어요.",
    url: "https://jjyu.co.kr/w/연말정산-조세전문가",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-조세전문가" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
