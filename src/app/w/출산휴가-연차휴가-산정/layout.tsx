import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "출산휴가 쓰면 연차가 줄어들까? 출근율 계산법과 기준 | 머니위키",
  description: "출산전후휴가 기간은 출근 간주돼서 연차 산정에 불이익이 없어요. 육아휴직도 마찬가지이고, 출근율 80% 이상이면 다음 해 연차 15일이 그대로 발생해요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/출산휴가-연차휴가-산정",
  },
  openGraph: {
    title: "출산휴가 쓰면 연차가 줄어들까? 출근율 계산법",
    description: "출산휴가 = 출근 간주. 연차 15일 그대로 발생. 계산 방법 안내.",
    url: "https://www.jjyu.co.kr/w/출산휴가-연차휴가-산정",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
