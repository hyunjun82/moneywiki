import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "아파트 하자보수보증금, 뭐에 쓰이나요? 용도와 보수 요청 방법 | 머니위키",
  description: "하자보수보증금은 건설사가 납부하는 돈으로 공사 하자 보수 비용에 쓰여요. 공종별 비율(2~5%)과 하자 보수 요청 절차를 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/아파트-하자보수보증금-용도",
  },
  openGraph: {
    title: "아파트 하자보수보증금, 뭐에 쓰이나요? 용도와 보수 요청 방법",
    description: "건설사가 내는 보증금, 하자 보수에 사용. 비율과 절차 정리.",
    url: "https://www.jjyu.co.kr/w/아파트-하자보수보증금-용도",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
