import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 결정세액이 뭔가요? 계산 방법과 환급금 차이",
  description: "결정세액은 산출세액에서 세액공제를 뺀 최종 세금이에요. 기납부세액에서 결정세액을 빼면 환급금이 나와요. 계산 구조와 예시를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-결정세액",
  },
  openGraph: {
    title: "연말정산 결정세액 계산 방법과 환급금 차이",
    description: "산출세액 - 세액공제 = 결정세액. 계산 예시로 이해하세요.",
    url: "https://www.jjyu.co.kr/w/연말정산-결정세액",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
