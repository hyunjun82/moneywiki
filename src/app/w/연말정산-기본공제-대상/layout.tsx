import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 기본공제, 누가 대상일까? 나이·소득 요건과 신청 방법 | 머니위키",
  description: "기본공제는 1인당 150만원 소득공제예요. 부모님은 만 60세 이상, 자녀는 만 20세 이하, 소득 100만원 이하가 요건이에요. 장애인은 나이 제한 없어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-기본공제-대상",
  },
  openGraph: {
    title: "연말정산 기본공제 대상과 나이·소득 요건",
    description: "1인당 150만원 소득공제, 대상별 요건 정리.",
    url: "https://www.jjyu.co.kr/w/연말정산-기본공제-대상",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
