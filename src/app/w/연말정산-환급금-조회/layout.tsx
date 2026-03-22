import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 환급금, 얼마 돌려받나? 홈택스 조회 방법과 지급 시기 | 머니위키",
  description: "연말정산 환급금은 홈택스 지급명세서에서 차감징수세액을 확인하면 돼요. 마이너스면 환급, 보통 2~3월 급여에 포함되어 지급돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연말정산-환급금-조회" },
  openGraph: {
    title: "연말정산 환급금, 얼마 돌려받나? 홈택스 조회 방법과 지급 시기 | 머니위키",
    description: "연말정산 환급금은 홈택스 지급명세서에서 차감징수세액을 확인하면 돼요. 마이너스면 환급, 보통 2~3월 급여에 포함되어 지급돼요.",
    url: "https://www.jjyu.co.kr/w/연말정산-환급금-조회",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
