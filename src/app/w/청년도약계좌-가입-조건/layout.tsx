import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "청년도약계좌, 내가 가입할 수 있나요? 가입 조건과 정부 기여금 | 머니위키",
  description: "만 19~34세, 총급여 7,500만원 이하면 가입 가능해요. 월 최대 70만원 납입, 정부 기여금 최대 월 3.3만원이에요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/청년도약계좌-가입-조건" },
  openGraph: { title: "청년도약계좌, 내가 가입할 수 있나요? 가입 조건과 정부 기여금 | 머니위키", description: "만 19~34세, 총급여 7,500만원 이하면 가입 가능해요. 월 최대 70만원 납입, 정부 기여금 최대 월 3.3만원이에요.", url: "https://www.jjyu.co.kr/w/청년도약계좌-가입-조건", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
