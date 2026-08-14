import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로소득세 세율과 계산 방법",
  description: "근로소득세 6~45% 누진세율, 간이세액표로 매월 원천징수. 80/100/120% 선택법과 연말정산 환급 방법 정리.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/근로소득세" },
  openGraph: {
    title: "근로소득세 세율과 계산 방법",
    description: "8단계 세율표 + 간이세액표 + 연말정산 절차 정리.",
    url: "https://www.jjyu.co.kr/w/근로소득세",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
