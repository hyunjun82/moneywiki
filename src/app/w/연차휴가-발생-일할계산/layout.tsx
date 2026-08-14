import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "입사 1년 미만인데 연차가 몇 개인가요? 연차 발생과 일할계산",
  description: "1년 미만 근로자는 매월 1일씩 최대 11일 연차가 생겨요. 1년 이후는 15일, 이후 2년마다 1일씩 추가돼요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/연차휴가-발생-일할계산" },
  openGraph: { title: "입사 1년 미만인데 연차가 몇 개인가요? 연차 발생과 일할계산 | 머니위키", description: "1년 미만 근로자는 매월 1일씩 최대 11일 연차가 생겨요. 1년 이후는 15일, 이후 2년마다 1일씩 추가돼요.", url: "https://www.jjyu.co.kr/w/연차휴가-발생-일할계산", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
