import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "월세 세액공제, 얼마 돌려받을까? 자격부터 신청까지 | 머니위키",
  description: "총급여 8,000만원 이하 무주택 세입자라면 월세의 15~17%를 돌려받을 수 있어요. 2025년 귀속분부터 한도 1,000만원으로 상향됐고 최대 5년 소급 환급도 가능해요.",
  alternates: { canonical: "https://www.jjyu.co.kr/w/월세-세액공제-신청" },
  openGraph: {
    title: "월세 세액공제, 얼마 돌려받을까? 자격부터 신청까지 | 머니위키",
    description: "총급여 8,000만원 이하 무주택 세입자라면 월세의 15~17%를 돌려받을 수 있어요. 2025년 귀속분부터 한도 1,000만원으로 상향됐고 최대 5년 소급 환급도 가능해요.",
    url: "https://www.jjyu.co.kr/w/월세-세액공제-신청",
    type: "article",
    siteName: "머니위키",
    locale: "ko_KR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
