import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연말정산 세율, 내 세금은 실제로 얼마일까? | 머니위키",
  description: "소득세는 6%~45% 누진세율이지만, 대부분 직장인 실효세율은 4~18%예요. 누진세율표와 연봉별 실효세율을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-세율",
  },
  openGraph: {
    title: "연말정산 세율, 내 세금은 실제로 얼마일까?",
    description: "연봉 1억이면 35%가 아니라 실효세율 15~18%예요. 누진세율 구조를 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연말정산-세율",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
