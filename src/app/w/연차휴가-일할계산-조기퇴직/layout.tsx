import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연차휴가 일할계산, 중도퇴직하면 얼마 받을까?",
  description: "퇴직해도 발생한 연차 중 미사용분은 수당으로 받아요. 일할계산 방법과 선사용 후 퇴직 시 반환 기준을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연차휴가-일할계산-조기퇴직",
  },
  openGraph: {
    title: "연차휴가 일할계산, 중도퇴직하면 얼마 받을까?",
    description: "발생 연차에서 사용분 빼면 끝이에요. 정산 방법과 청구 기준을 정리했어요.",
    url: "https://www.jjyu.co.kr/w/연차휴가-일할계산-조기퇴직",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
