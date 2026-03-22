import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 다자녀 세액공제 금액 조건 출산 추가 | 머니위키",
  description: "자녀 1명 15만원, 2명 35만원, 3명 65만원 세액공제. 출산 시 첫째 30만원~셋째 70만원 추가. 만 8~20세 대상.",
  openGraph: {
    title: "연말정산 다자녀 세액공제 금액 조건 출산 추가",
    description: "자녀 수별 공제 금액과 출산 추가 공제 기준.",
    url: "https://jjyu.co.kr/w/연말정산-다자녀-세액공제",
  },
  alternates: { canonical: "https://jjyu.co.kr/w/연말정산-다자녀-세액공제" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
