import { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "청년미래적금 vs 청년도약계좌 차이, 중복가입과 기여금 비교 | 머니위키",
  description: "청년미래적금은 3년 만기, 청년도약계좌는 5년 만기예요. 기여금·수령액·중복가입 여부를 비교했어요.",
  openGraph: {
    title: "청년미래적금 vs 청년도약계좌 차이, 중복가입과 기여금 비교 | 머니위키",
    description: "청년미래적금과 청년도약계좌의 핵심 차이를 비교했어요.",
    url: "https://www.jjyu.co.kr/w/청년미래적금-청년도약계좌-차이",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년미래적금-청년도약계좌-차이" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
