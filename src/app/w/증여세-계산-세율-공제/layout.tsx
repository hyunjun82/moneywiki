import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "증여세 계산 세율 공제 한도 가족 관계별 | 머니위키",
  description: "배우자 6억원, 성인자녀 5천만원, 미성년자 2천만원 비과세. 결혼·출산 시 1억원 추가. 세율 10~50% 구간과 3개월 신고 방법.",
  openGraph: {
    title: "증여세 계산 세율 공제 한도 가족 관계별",
    description: "10년 합산 공제 규칙과 자진신고 3% 공제 혜택 정리.",
    url: "https://jjyu.co.kr/w/증여세-계산-세율-공제",
  },
  alternates: {
    canonical: "https://jjyu.co.kr/w/증여세-계산-세율-공제",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
