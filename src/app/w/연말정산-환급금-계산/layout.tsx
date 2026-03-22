import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 환급금 계산, 공식부터 환급 늘리는 방법까지 | 머니위키",
  description: "환급금 = 기납부세액 - 결정세액. 연봉 5천만원 기준 공제 잘 챙기면 50만원 이상 돌려받을 수 있어요. 계산 과정과 환급금 늘리는 체크리스트까지 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-환급금-계산",
  },
  openGraph: {
    title: "연말정산 환급금 계산, 공식부터 환급 늘리는 방법까지",
    description: "기납부세액 - 결정세액 = 환급금. 50만원 환급 사례로 설명.",
    url: "https://www.jjyu.co.kr/w/연말정산-환급금-계산",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
