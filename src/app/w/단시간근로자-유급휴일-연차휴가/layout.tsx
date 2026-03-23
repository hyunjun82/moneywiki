import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "단시간근로자 유급휴일과 연차 계산 | 머니위키",
  description: "주 15시간 이상이면 주휴수당·연차·퇴직금 모두 가능. 연차 비례 계산 공식과 예시, 권리 침해 시 대응법.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/단시간근로자-유급휴일-연차휴가" },
  openGraph: {
    title: "단시간근로자 유급휴일과 연차 계산",
    description: "주 15시간 기준 + 연차 비례 계산 공식 + 권리 정리.",
    url: "https://www.jjyu.co.kr/w/단시간근로자-유급휴일-연차휴가",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
