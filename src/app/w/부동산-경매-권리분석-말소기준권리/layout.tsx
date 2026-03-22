import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "경매 권리분석, 말소기준권리란? 인수·말소 구분하는 5단계 방법 | 머니위키",
  description: "말소기준권리보다 먼저 등기된 권리는 인수, 나중 등기는 말소돼요. 근저당·가압류·경매개시결정 중 최선순위가 기준. 5단계 권리분석 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/부동산-경매-권리분석-말소기준권리",
  },
  openGraph: {
    title: "경매 권리분석, 말소기준권리란? 인수·말소 구분하는 5단계",
    description: "선순위는 인수, 후순위는 말소. 5단계 권리분석으로 안전한 입찰.",
    url: "https://www.jjyu.co.kr/w/부동산-경매-권리분석-말소기준권리",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
