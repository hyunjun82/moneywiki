import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "가상자산 세금, 2027년 22% 과세 시행 계산법과 신고 방법",
  description: "2027년 1월부터 비트코인·이더리움 수익에 22% 세금이 붙어요. 연 250만원 공제, 이동평균법 취득가액, CARF 해외 거래소 정보교환, 신고 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/가상자산-세금",
  },
  openGraph: {
    title: "가상자산 세금, 2027년 22% 과세 시행 계산법과 신고 방법",
    description: "2027년 가상자산 과세 시행 확정. 22% 세율, 250만원 공제, CARF 해외 거래소 추적까지 정리했어요.",
    url: "https://www.jjyu.co.kr/w/가상자산-세금",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
