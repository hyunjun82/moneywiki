import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "국민연금 예상수령액 확인 방법",
  description: "국민연금공단 홈페이지·앱에서 예상 수령액 5분 조회. 가입기간·소득별 산정 방식과 추납·연기연금으로 늘리는 방법.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/국민연금-예상수령액-확인" },
  openGraph: {
    title: "국민연금 예상수령액 확인 방법",
    description: "NPS 5분 조회 + 연금 늘리는 방법 3가지 정리.",
    url: "https://www.jjyu.co.kr/w/국민연금-예상수령액-확인",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
