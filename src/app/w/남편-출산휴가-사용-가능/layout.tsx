import type { Metadata } from "next";
export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "배우자 출산휴가: 10일 기간 및 급여",
  description: "배우자 출산 시 남편도 10일 유급휴가 받을 수 있고 최초 5일 회사 부담 이후 5일 고용보험 지급이라는 거 아시나요? 신청 방법부터 급여 지급까지 알려드려요",
  alternates: { canonical: "https://www.jjyu.co.kr/w/남편-출산휴가-사용-가능" },
  openGraph: { title: "배우자 출산휴가: 10일 기간 및 급여 | 머니위키", description: "배우자 출산 시 남편도 10일 유급휴가 받을 수 있고 최초 5일 회사 부담 이후 5일 고용보험 지급이라는 거 아시나요? 신청 방법부터 급여 지급까지 알려드려요", url: "https://www.jjyu.co.kr/w/남편-출산휴가-사용-가능", type: "article", siteName: "머니위키", locale: "ko_KR" },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
