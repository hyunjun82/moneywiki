import { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "종합부동산세 계산 방법 및 세율: 주택·토지 과세 기준 | 머니위키",
  description: "종합부동산세 얼마나 내는지 궁금하시죠. 1세대 1주택은 공시가격 12억원, 다주택은 6억원 초과 시 부과돼요",
  openGraph: { title: "종합부동산세 계산 방법 및 세율: 주택·토지 과세 기준 | 머니위키", description: "종합부동산세 얼마나 내는지 궁금하시죠. 1세대 1주택은 공시가격 12억원, 다주택은 6억원 초과 시 부과돼요", url: "https://www.jjyu.co.kr/w/종합부동산세", type: "article", siteName: "머니위키", locale: "ko_KR" },
  alternates: { canonical: "https://www.jjyu.co.kr/w/종합부동산세" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
