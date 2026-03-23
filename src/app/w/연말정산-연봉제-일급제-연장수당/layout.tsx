import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "연봉제·일급제 연장수당 비과세 조건과 확인 방법 | 머니위키",
  description: "연장·야간·휴일수당은 생산직 월 210만원 이하 근로자에 한해 월 240만원까지 비과세돼요. 연봉제·일급제별 적용 방식과 급여명세서 확인 방법을 정리했어요.",
  alternates: {
    canonical: "https://www.jjyu.co.kr/w/연말정산-연봉제-일급제-연장수당",
  },
  openGraph: {
    title: "연봉제·일급제 연장수당 비과세 조건과 확인 방법",
    description: "생산직 월 210만원 이하, 연장+야간+휴일수당 월 240만원까지 비과세. 포괄임금제 주의사항.",
    url: "https://www.jjyu.co.kr/w/연말정산-연봉제-일급제-연장수당",
    type: "article",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
