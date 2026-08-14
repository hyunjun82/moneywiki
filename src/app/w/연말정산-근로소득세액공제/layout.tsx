import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "근로소득세액공제, 내가 얼마 받는 건지? 공제율부터 연봉별 한도까지",
  description: "근로소득세액공제는 산출세액의 55%(130만원 이하) 또는 30%(초과분)를 자동으로 빼주는 세액공제예요. 총급여별 한도는 74만원(3,300만원 이하)부터 50만원(1.2억 초과)까지 달라져요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-근로소득세액공제",
  },
  openGraph: {
    title: "근로소득세액공제, 내가 얼마 받는 건지? 공제율부터 연봉별 한도까지",
    description: "산출세액 기준 공제율과 총급여별 한도. 직장인 자동 적용, 최대 74만원.",
    url: "https://www.jjyu.co.kr/w/연말정산-근로소득세액공제",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
